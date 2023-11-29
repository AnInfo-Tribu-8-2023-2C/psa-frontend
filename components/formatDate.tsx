import { parseISO, format } from "date-fns";

export default function FormatDate({ dateString }:{dateString: any}){
    const date = parseISO(dateString);

    return(
        <time>{format(date, 'LLL d, yyyy' )}</time>
    )
}