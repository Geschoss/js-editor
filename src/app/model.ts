export class TextModel {
	text: string;
	x: number;
	y: number;
	size: number;
	color: string;
	font: string;
}

export class Model {
    backgroundUrl: string;
    'x-size': number;
    'y-size': number;
    content: TextModel[];
}


export class CardModel {
    backgroundUrl: string;
    'x-size': number;
    'y-size': number;
}
