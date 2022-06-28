import { Document, Paragraph } from 'docx';
import * as helpers from './helpers'

const title = "Заявление";
const subtitle = "за получаване на право за използване на герой/комикс";
const footer = "СОБСТВЕНИКЪТ си запазва правото да изпрати сигнал за нередност при констатиране на такава от страна на ПОДАТЕЛЯ!"
const adminMessage = "Администраторът на платформата има правото да свали новия герой или комикс от платформата, БЕЗ ПРЕДУПРЕЖДЕНИЕ, при наличие на сигнал от СОБСТВЕНИКА, който има Документ за авторско право, нарушаване на задълженията, описани в този документ и/или при наличие на нарушение от друго естество!"

export const generateRequestDocument = ( data, document ) => {
    // Create a new instance of Document for the docx module
    let doc = new Document({
        sections: [
            {
                children: [
                    helpers.createHeader(document),
                    ...helpers.createTitle(title, subtitle),
                    helpers.blankLine(),
                    ...createMainText(data, document),
                    helpers.blankLine(),
                    createMessage(document.message),
                    helpers.blankLine(),
                    helpers.createFooter(footer),
                    helpers.createFooter(adminMessage)
                ]
            }
        ],
        styles: {
            paragraphStyles: helpers.defaultParagraphStyles
        }
    });

    return doc;
}


const createMainText = (data, document) => {
    const text = [
        `На ${new Date(document._createdOn).toLocaleDateString('bg-BG')}, потребител с ИН: ${document._docOwnerId}, наричан за по-кратко ПОДАТЕЛ е подал заявление за получаване на право за използване на ${document.requestedDataType === 'comics' ? "комикс" : "герой"}, който принадлежи на потребител с ИН: ${document._dataOwnerId}, наричан за по-кратко СОБСТВЕНИК.`,
        `ПОДАТЕЛЯТ моли за разрешение да получи права за използване на ${document.requestedDataType} с ИН: ${data._id}, който принадлежи на СОБСТВЕНИКА в свой ${document.newDataType === 'comics' ? "комикс" : "герой"}, като изпраща следното съобщение:`,
    ];
    return helpers.createMainText(text);
}

const createMessage = (message) => {
    return new Paragraph(helpers.getDataConfig('', message))
}
