import differenceInMinutes from "date-fns/differenceInMinutes";

export default (lastSeen) => {
    if (differenceInMinutes(new Date(), new Date(lastSeen)) <= 5) {
        return true;
    } else {
        return false;
    }
};
