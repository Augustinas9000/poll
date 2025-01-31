export class Outcome {

    public static $TYPE_LIST_OF_ANSWERS = 1;
    public static $TYPE_OPEN_QUESTION = 2;


    id: number;
    type: number;
    title: string;
    position?: number;
    question_id?: number;


}

