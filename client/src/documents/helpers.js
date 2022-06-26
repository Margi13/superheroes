import { Paragraph, HeadingLevel, AlignmentType, TextRun, TabStopType, TabStopPosition } from 'docx';

export const blankLine = () => {
    return new Paragraph({ text: '' })
}

export const getDataConfig = (text, data, style) => {
    return {
        ...getPartialDataConfig(style),
        children: [
            new TextRun({ text, bold: true }),
            new TextRun({ text: data, italics: true }),
        ]
    }
}

export const getPartialDataConfig = (style) => {
    return {
        style: style ? style : "paragraphStyle",
        bullet: {
            level: 0
        },
        alignment: AlignmentType.JUSTIFIED
    }
}

export const createHeader = (document, style) => {
    return new Paragraph({
        style: style ? style : "headerStyle",
        tabStops: [
            {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX
            }
        ],
        children: [
            new TextRun(`Дата: ${new Date(document._createdOn).toLocaleDateString('bg-BG')}`),
            new TextRun(`\tДок. No: ${document._id}`),
        ]
    })
}
export const createFooter = (text, style) => {
    return new Paragraph({
        text: `\t${text}`,
        style: style ? style : "paragraphStyle",
        alignment: AlignmentType.JUSTIFIED,
    })
}

export const createTitle = (title, subtitle) => {
    return [
        new Paragraph({ text: title, heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: subtitle, alignment: AlignmentType.CENTER })
    ];
}
export const createMainText = (textArray, style) => {
    return textArray.map(text =>
        new Paragraph({ 
            style: style ? style : "paragraphStyle", 
            children: [new TextRun(`\t${text}`)],
            alignment: AlignmentType.JUSTIFIED
        })
    );
}

export const defaultParagraphStyles = [
    {
        id: "headerStyle",
        name: "Header Style",
        basedOn: "Normal",
        run: {
            size: 24
        },
        paragraph: {
            spacing: { line: 276, before: 150, after: 150 },
        }
    },
    {
        id: "paragraphStyle",
        name: "Paragraph Style",
        basedOn: "Normal",
        run: {
            size: 24
        },
        paragraph: {
            spacing: { line: 276, before: 150, after: 150 },
        }
    },
]