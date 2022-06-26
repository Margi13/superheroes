import { Document, Paragraph, TextRun, ExternalHyperlink } from 'docx';
import * as helpers from './helpers'

const title = "Документ";
const subtitle = "на получаване на право за използване на герой/комикс";
const footer = "СОБСТВЕНИКЪТ си запазва правото да изпрати сигнал за нередност при констатиране на такава от страна на ПОДАТЕЛЯ!"
const adminMessage = "Администраторът на платформата има правото да свали новия герой или комикс от платформата, БЕЗ ПРЕДУПРЕЖДЕНИЕ, при наличие на сигнал от СОБСТВЕНИКА, който има Документ за авторско право, нарушаване на задълженията, описани в този документ и/или при наличие на нарушение от друго естество!"
const copyrightMessages = [
    "ПОДАТЕЛЯТ ТРЯБВА да реферира този документ, когато създава своя нов {newDataType}, ако е получил положителен отговор и е използвал този {requestedDataType}, за когото е искал разрешение!",
    "Тези три документа ще бъдат видими за СОБСТВЕНИКА, ПОДАТЕЛЯ и Администратора на платформата.",
    "Авторското право върху дадения {type} остава на СОБСТВЕНИКА, независимо от неговият отговор. ПОДАТЕЛЯТ получава правото за използване, но не и авторските права!"
]
export const generateRightsDocument = ( document ) => {
    // Create a new instance of Document for the docx module
    let doc = new Document({
        sections: [
            {
                children: [
                    helpers.createHeader(document),
                    ...helpers.createTitle(title, subtitle),
                    helpers.blankLine(),
                    ...createMainText(document),
                    helpers.blankLine(),
                    createMessage(document.message),
                    helpers.blankLine(),
                    ...createCopyrightMessages(),
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


const createMainText = (document) => {
    const text = [
        `На ${new Date(document._createdOn).toLocaleDateString('bg-BG')}, потребител с ИН: ${document._docOwnerId}, наричан за по-кратко ПОДАТЕЛ е подал заявление за получаване на право за използване на ${document.requestedDataType === "comics" ? "комикс" : "герой"}, който принадлежи на потребител с ИН: ${document._dataOwnerId}, наричан за по-кратко СОБСТВЕНИК.`,
        `На ${new Date(document._updatedOn).toLocaleDateString('bg-BG')}, СОБСТВЕНИКЪТ е дал своят ${document.response === true ? "положителен" : "отрицателен"} отговор на заявление с име: request_${document._id} за получаване на право за използване на ${document.requestedDataType === "comics" ? "комикс" : "герой"}, подадено от ПОДАТЕЛЯ.`,
        `Oт днес ${new Date(document._updatedOn).toLocaleDateString('bg-BG')}, въз основа на ${document.response === true ? "полученото разрешение" : "полученият отказ"} от СОБСТВЕНИКА, ПОДАТЕЛЯТ ${document.response === true ? "има" : "няма"} право да използва ${document.requestedDataType === "comics" ? "комикс" : "герой"} с ИН: ${document._dataId}, принадлежащ на СОБСТВЕНИКА, като референция или история в свой нов ${document.newDataType === "comics" ? "комикс" : "герой"}.`
    
    ];
    return helpers.createMainText(text);
}

const createMessage = (message) => {
    return new Paragraph(helpers.getDataConfig('', message))
}

const createCopyrightMessages = () => {
    return copyrightMessages.map(m => helpers.createFooter(m));
}
