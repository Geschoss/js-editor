export class TextModel {
	text: string;
	x: number;
	y: number;
	size: number;
	color: string;
	font: string;
}

export class Model {
    background: CardModel;
    content: TextModel[];
}


export class CardModel {
    backgroundUrl: string;
}
