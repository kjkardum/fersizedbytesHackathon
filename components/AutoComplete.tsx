// Modified: https://stackoverflow.com/questions/43393136/js-create-smart-auto-complete

const arr = ["abc", "def", "ghjk"];

const main = (props) => {
    let inputValue = props.searchValue;
    let cities = arr.slice();

    cities.sort((str1, str2) => (distance(str1, inputValue) < distance(str2, inputValue) ? 1 : -1));
    return (
        <div>
            {cities.map((el) => {
                let s = matchingChars(el, inputValue);
                return <ul key={Math.random()}>{el.split("").map((c, i) => (s.has(i) ? <b>{c}</b> : c))}</ul>;
            })}
        </div>
    );
};

export default main;

function distance(val1, val2) {
    let longer, shorter, longerlth, result;

    if (val1.length > val2.length) {
        longer = val1;
        shorter = val2;
    } else {
        longer = val2;
        shorter = val1;
    }

    longerlth = longer.length;

    result = (longerlth - editDistance(longer, shorter)) / parseFloat(longerlth);

    return result;
}

function editDistance(val1, val2) {
    val1 = val1.toLowerCase();
    val2 = val2.toLowerCase();

    let costs = [];

    for (let i = 0; i <= val1.length; i++) {
        let lastVal = i;
        for (let j = 0; j <= val2.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else if (j > 0) {
                let newVal = costs[j - 1];
                if (val1.charAt(i - 1) !== val2.charAt(j - 1)) {
                    newVal = Math.min(Math.min(newVal, lastVal), costs[j]) + 1;
                }
                costs[j - 1] = lastVal;
                lastVal = newVal;
            }
        }
        if (i > 0) {
            costs[val2.length] = lastVal;
        }
    }

    return costs[val2.length];
}

// Should be dp, not greedy, might change
function matchingChars(hay: String, needle: String) {
    let charIndicies = new Set();
    let i = 0,
        j = 0;
    while (i < hay.length && j < needle.length) {
        if (i == j) {
            ++i;
            ++j;
            charIndicies.add(i);
        } else ++i;
    }
    return charIndicies;
}
