import { parseISO, format } from "date-fns";

export default function IsLeaderNull({ lider }:{lider: any}){
    if (lider === null) {return (<>   </>)} else {
    return(
        <>{lider['id']}</>
    )}
}