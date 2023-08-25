import moment from "moment-timezone";

export const times = [
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00"
]
export const toUTC = (timeString)=>{
    // console.log(moment(timeString).utcOffset(-360));
    // console.log(Date.parse(timeString));
    // console.log(moment(Date.parse(timeString)).tz("America/Chicago").format("yyyy-MM-DD HH:mmZ"));
    const centralTime = moment(timeString).tz("America/Chicago").format("yyy-MM-DD HH:mm");
    // const UTCtime = moment(centralTime).tz("UTC").format("yyyy-MM-DD HH:mm");

    console.log("central time", centralTime);
    // console.log("utc time", UTCtime);
    // as this application is to service our stores which are located in the midwest, all times are central standard time.
    // create a timestamp with a central time zone
    // convert the time stamp to UTC time.
    // create a date string from the UTC time. format yyyy-MM-dd HH:mm
    return centralTime;
}

export const checkBusinessHours = (dateString) =>{
    return moment(dateString).format("dddd");
}

