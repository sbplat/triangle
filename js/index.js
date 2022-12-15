$(document).ready(function() {
    $("#side-info").submit(function(event) {
        event.preventDefault()

        const angle = $("#angle").val(), sideLength = parseInt($("#side-length").val())

        let triplets

        if (angle == "60") {
            triplets = find60(sideLength)

        } else {
            triplets = find120(sideLength)
        }

        const solutionsString =
        `Adjacent Triplets (${triplets.adjacent.length}):<br>` +
        `${triplets.adjacent.join("<br>") || "None"}<br><br>` +
        `Opposite Triplets (${triplets.opposite.length}):<br>` +
        `${triplets.opposite.reverse().join("<br>") || "None"}`

        $("#triplets").html(solutionsString)
    })
})

function getFactorPairs(number) {
    let factorPairs = []

    for (let i = 1; i * i <= number; ++i) {
        if (number % i == 0) {
            factorPairs.push([i, number / i])

            if (i * i != number) {
                factorPairs.push([number / i, i])
            }
        }
    }

    return factorPairs
}

function find60(length) {
    const lengthSquared = length ** 2, adjacentFactorPairs = getFactorPairs(3 * lengthSquared)
    let adjacentSolutions = []

    /*
    let p = length
    c^2 = p^2 + b^2 - pb
        = (b - p/2)^2 + 3p^2 / 4
    4c^2 = (2b - p)^2 + 3p^2
    (2c + 2b - p)(2c - 2b + p) = 3p^2
          m            n
    c = (m + n)/4
    2b - p = (m - n)/2
    b = (m - n + 2p) / 4
    */

    for (const [m, n] of adjacentFactorPairs) {
        const opposite4 = m + n, adjacent4 = m - n + 2 * length

        if (opposite4 == adjacent4) {
            continue
        }

        if (opposite4 > 0 && adjacent4 > 0 && opposite4 % 4 == 0 && adjacent4 % 4 == 0) {
            adjacentSolutions.push([length, adjacent4 / 4, opposite4 / 4].sort((first, second) => parseInt(first) - parseInt(second)).join(", "))
        }
    }

    let oppositeSolutions = []

    for (let a = 1; a < length; ++a) {
        const aSquared = a ** 2

        for (let b = length + 1; b <= 2 * length; ++b) {
            if (a + length <= b) {
                continue
            }

            const bSquared = b ** 2

            if (lengthSquared == aSquared + bSquared - a * b) {
                oppositeSolutions.push([a, b, length].sort((first, second) => parseInt(first) - parseInt(second)).join(", "))
            }
        }
    }

    return {
        adjacent: adjacentSolutions,
        opposite: oppositeSolutions
    }
}

function find120(length) {
    const lengthSquared = length ** 2, adjacentFactorPairs = getFactorPairs(3 * lengthSquared)
    let adjacentSolutions = []

    /*
    let p = length
    c^2 = p^2 + b^2 + pb
        = (b + p/2)^2 + 3p^2 / 4
    4c^2 = (2b + p)^2 + 3p^2
    (2c + 2b + p)(2c - 2b - p) = 3p^2
          m            n
    c = (m + n)/4
    2b + p = (m - n)/2
    b = (m - n - 2p) / 4
    */

    for (const [m, n] of adjacentFactorPairs) {
        const opposite4 = m + n, adjacent4 = m - n - 2 * length

        if (opposite4 == adjacent4) {
            continue
        }

        if (opposite4 > 0 && adjacent4 > 0 && opposite4 % 4 == 0 && adjacent4 % 4 == 0) {
            adjacentSolutions.push([length, adjacent4 / 4, opposite4 / 4].sort((first, second) => parseInt(first) - parseInt(second)).join(", "))
        }
    }

    let oppositeSolutions = []

    const sqrtBound = Math.floor(length / Math.sqrt(3))

    for (let a = 1; a < sqrtBound; ++a) {
        const aSquared = a ** 2

        for (let b = sqrtBound + 1; b < length; ++b) {
            if (a + b <= length) {
                continue
            }

            const bSquared = b ** 2

            if (lengthSquared == aSquared + bSquared + a * b) {
                oppositeSolutions.push([a, b, length].sort((first, second) => parseInt(first) - parseInt(second)).join(", "))
            }
        }
    }

    return {
        adjacent: adjacentSolutions,
        opposite: oppositeSolutions
    }
}
