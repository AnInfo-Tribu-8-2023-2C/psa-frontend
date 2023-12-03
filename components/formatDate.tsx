import { parseISO, format } from "date-fns";

export default function FormatDate({ dateString }:{dateString: any}){
    const date = parseISO(dateString);

    if (date === null) {return (<time>   </time>)} else {
    return(
        <time>{format(date, 'LLL d, yyyy' )}</time>
    )}
}
