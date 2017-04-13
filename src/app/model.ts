export class TextObj {
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
    content: TextObj[];
}

