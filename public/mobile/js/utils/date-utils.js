// Get elapsed time as string. Example:
//   getElapsedTimeString(2)      -> "just now"
//   getElapsedTimeString(55000)  -> "55 seconds ago"
//   getElapsedTimeString(65000)  -> "1 minute ago"
//   getElapsedTimeString(125000) -> "2 minutes ago"
function getElapsedTimeString(differenceInMilliseconds) {
    var secondsAgo = Math.floor(differenceInMilliseconds / 1000);
    var minutesAgo = Math.floor(secondsAgo / 60);
    var hoursAgo = Math.floor(minutesAgo / 60);

    if (secondsAgo < 30) {
        return 'just now';
    }

    if (secondsAgo < 60) {
        return secondsAgo + getPlural(' second', secondsAgo) + ' ago';
    }

    if (minutesAgo < 60) {
        return minutesAgo + getPlural(' minute', minutesAgo) + ' ago';
    }

    if (hoursAgo < 60) {
        return hoursAgo + getPlural(' hour', hoursAgo) + ' ago';
    }
}

function getPlural(text, count) {
    return text + (count > 1 ? 's' : '');
}