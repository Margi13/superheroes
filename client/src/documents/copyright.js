import { Document, Paragraph, TextRun, ExternalHyperlink } from 'docx';
import * as helpers from './helpers'

const title = "Документ";
const subtitle = "за получаване на авторски права";
const footer = "СОБСТВЕНИКЪТ има правото да използва този документ, при наличие на нередност спрямо използване на негови герои или комикси от други хора, като доказателство, че е негова собственост!"
const adminMessage = "Администраторът на платформата има правото да свали новия герой или комикс от платформата, БЕЗ ПРЕДУПРЕЖДЕНИЕ, при наличие на сигнал от СОБСТВЕНИКА, който има Документ за авторско право, нарушаване на задълженията, описани в този документ и/или при наличие на нарушение от друго естество!"

export const generateCopyrightDocument = (data, document, image, dataType) => {

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
                    ...createDataInfo(data, image, dataType),
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
        `На ${new Date(data._createdOn).toLocaleDateString('bg-BG')}, потребител с ИН: ${document._userId}, наричан за по-кратко СОБСТВЕНИК е създал ${document.dataType === 'heroes' ? 'герой' : 'комикс'} с ИН: ${data._id}.`,
        `На ${new Date(document._createdOn).toLocaleDateString('bg-BG')}, СОБСТВЕНИКЪТ е получил одобрение за публикуването му и е създаден настоящият документ, който доказва авторството на ${document.dataType === 'heroes' ? 'герой' : 'комикс'} с данни:`,
    ];
    return helpers.createMainText(text);
}
const createDataInfo = (data, image, dataType) => {
    return dataType === 'comics' ? createComicsInfo(data, image) : createHeroInfo(data, image)
}
const createHeroInfo = (hero, image) => {
    return [
        new Paragraph(helpers.getDataConfig('Истинско име: ', hero.personName)),
        new Paragraph(helpers.getDataConfig('Псевдоним: ', hero.heroName)),
        new Paragraph(helpers.getDataConfig('Раса: ', hero.kind)),
        new Paragraph(helpers.getDataConfig('Години: ', hero.age)),
        new Paragraph({
            ...helpers.getPartialDataConfig(),
            children: [
                new TextRun({ text: `Изображение: `, bold: true }),
                new ExternalHyperlink({
                    children: [
                        new TextRun({ text: 'Свали', underline: true, italics: true })
                    ],
                    link: image
                })
            ]
        }),
        new Paragraph(helpers.getDataConfig('История: ', hero.story))
    ]
}
const createComicsInfo = (comics, image) => {
    return [
        new Paragraph(helpers.getDataConfig('Заглавие: ', comics.title)),
        new Paragraph(helpers.getDataConfig('Жанр: ', comics.genre)),
        new Paragraph({
            ...helpers.getPartialDataConfig(),
            children: [
                new TextRun({ text: `Корица: `, bold: true }),
                new ExternalHyperlink({
                    children: [
                        new TextRun({ text: 'Свали', underline: true, italics: true })
                    ],
                    link: image
                })
            ]
        }),
        new Paragraph(helpers.getDataConfig('Описание: ', comics.description))
    ]
}