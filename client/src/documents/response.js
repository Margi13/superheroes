import { Document, Paragraph } from 'docx';
import * as helpers from './helpers'

const title = "Отговор";
const subtitle = "на получаване на право за използване на герой/комикс";
const footer = "СОБСТВЕНИКЪТ си запазва правото да изпрати сигнал за нередност при констатиране на такава от страна на ПОДАТЕЛЯ!"
const adminMessage = "Администраторът на платформата има правото да свали новия герой или комикс от платформата, БЕЗ ПРЕДУПРЕЖДЕНИЕ, при наличие на сигнал от СОБСТВЕНИКА, който има Документ за авторско право, нарушаване на задълженията, описани в този документ и/или при наличие на нарушение от друго естество!"

export const generateResponseDocument = (data, document ) => {
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
        `На ${new Date(document._updatedOn).toLocaleDateString('bg-BG')}, потребител с ИН: ${document._dataOwnerId}, наричан за по-кратко СОБСТВЕНИК е отговорил на заявление с име request_${document._id} за получаване на право за използване на ${document.requestedDataType === "comics" ? "комикс" : "герой"}, подадено от потребител с ИН: ${document._docOwnerId}, наричан за по-кратко ПОДАТЕЛ.`,
        `СОБСТВЕНИКЪТ ${document.response === true ? "прие" : "отказа"} молбата на ПОДАТЕЛЯ за използване на неговия ${document.requestedDataType === "comics" ? "комикс" : "герой"} с ИН: ${data._id} за използването му в нов ${document.newDataType === "comics" ? "комикс" : "герой"}, на базата на изпратеното съобщение от ПОДАТЕЛЯ:`,
    ];
    return helpers.createMainText(text);
}

const createMessage = (message) => {
    return new Paragraph(helpers.getDataConfig('', message))
}
