import type { Time } from "$lib/types.ts";
export function timeToSecond(time: Time) {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 3600 + minute * 60;
}

export function timeGt(time1: Time, time2: Time) {
    return timeToSecond(time1) > timeToSecond(time2);
}

export function timeLt(time1: Time, time2: Time) {
    return timeToSecond(time1) < timeToSecond(time2);
}

export function timeIsActive(start: Time, end: Time, now = Date.now()) {
    // get seconds elapsed since start of the day
    const secondInDay = now % (24 * 3600 * 1000);
    return timeToSecond(start) <= secondInDay && secondInDay <= timeToSecond(end);
}

export function timeDiff(start: Time, end: Time) {
    const startSecond = timeToSecond(start);
    const endSecond = timeToSecond(end);
    return endSecond - startSecond;
}