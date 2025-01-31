import {Question} from "./question";

export class Voting {

    public static $START_IMMEDIATELY = 1;
    public static $START_MANUALLY = 2;
    public static $START_AT_SPECIFIC_TIME = 3;

    public static $CLOSE_MANUALLY = 1;
    public static $CLOSE_AT_SPECIFIC_TIME = 2;
    public static $CLOSE_AFTER_SPECIFIC_INTERVAL = 3;

    public static $DISPLAY_NOT = 1;
    public static $DISPLAY_FOR_SPECIFIC_INTERVAL = 2;
    public static $DISPLAY_DURING_VOTING_AND_AFTER_FOR_SPECIFIC_INTERVAL = 3;

    id?: number;
    created_at?: string;
    updated_at?	: string;
    login_required?: boolean
    time_vote_started?: string;
    time_vote_stopped?: string;
    user_id?: number;
    name?: string;
    valid_time?: string;
    display_time?: string;
    snap_vote?: boolean
    access_code: string;
    start_method?: number;
    close_method?: number;
    display_method?: number;
    allowed_voters?: string;
    encrypted?: boolean
    password?: string;
    votes_count?: number;
    url_token?: string;
    questions?: Question[];
}
