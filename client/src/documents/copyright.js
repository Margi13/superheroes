import { Document, Paragraph, TextRun, ExternalHyperlink } from 'docx';
import * as helpers from './helpers'

const title = "Документ";
const subtitle = "за получаване на авторски права";
const footer = "СОБСТВЕНИКЪТ има правото да използва този документ, при наличие на нередност спрямо използване на неговия герой от други хора, като доказателство, че този герой е негов!"
const adminMessage = "Администраторът на платформата има правото да свали новия герой или комикс от платформата, БЕЗ ПРЕДУПРЕЖДЕНИЕ, при наличие на сигнал от СОБСТВЕНИКА, който има Документ за авторско право, нарушаване на задълженията, описани в този документ и/или при наличие на нарушение от друго естество!"

export const generateCopyrightDocument = (hero, document, image) => {
    const mockDocument = {
        _id: 1,
        _userId: 1,
        for: 'hero',
        _createdOn: new Date()
    }
    // Create a new instance of Document for the docx module
    let doc = new Document({
        sections: [
            {
                children: [
                    helpers.createHeader(mockDocument),
                    ...helpers.createTitle(title, subtitle),
                    helpers.blankLine(),
                    ...createMainText(hero, mockDocument),
                    helpers.blankLine(),
                    ...createHeroInfo(hero, image),
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


const createMainText = (hero, document) => {
    const text = [
        `На ${new Date(hero._createdOn).toLocaleDateString('bg-BG')}, потребител с ИН: ${document._userId}, наричан за по-кратко СОБСТВЕНИК е създал ${document.for === 'hero' ? 'герой' : 'комикс'} с ИН: ${hero._id}.`,
        `На ${new Date(document._createdOn).toLocaleDateString('bg-BG')}, СОБСТВЕНИКЪТ е получил одобрение за публикуването му и е създаден настоящият документ, който доказва авторството на герой с данни:`,
    ];
    return helpers.createMainText(text);
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
