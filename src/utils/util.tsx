export const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

export const calculateFlipping = (
    pageSize: {
        width: number;
        height: number;
    },
    draggingPosition: {
        x: number;
        y: number;
    }
) => {
    const x = draggingPosition.x;
    const y = draggingPosition.y;

    // First we want to calculate the length of the page that's folded
    // We know the X position of the corner of the page
    // We want the length of the page that's folded (Hypotenuse) to be equal to the length of the base page that's visible
    // We know the height of the corner of the page (h = height - y)
    // We know the length of the base page that's visible (X)
    // (X - H)^2 + h^2 = H^2
    // H^2 = X^2 - 2XH + H^2 + h^2
    // 0 = X^2 + h^2 - 2XH
    // H = (X^2 + h^2) / (2X)

    const h = pageSize.height - y;
    const foldedLength = clamp((h ** 2 + x ** 2) / (2 * x), 0, pageSize.width);

    // Now we want to obtain the vector of the corner of the page
    // We know the starting point (foldedLength, height)
    // We know the ending point (x, y)

    let adjacent = x - foldedLength;
    let opposite = pageSize.height - y;
    const hypotenuse = Math.sqrt(adjacent ** 2 + opposite ** 2);
    const angle = Math.atan(opposite / adjacent) * (180 / Math.PI);

    // Now we want to clamp the vector to the width of the page
    // We know the angle of the vector

    if (hypotenuse > pageSize.width) {
        const newHypotenuse = pageSize.width;
        const newOpposite = Math.sin(angle * (Math.PI / 180)) * newHypotenuse;
        const newAdjacent = Math.cos(angle * (Math.PI / 180)) * newHypotenuse;

        // Adjust for the angle of the vector
        if (angle < 0) {
            adjacent = -newAdjacent;
            opposite = -newOpposite;
        } else {
            adjacent = newAdjacent;
            opposite = newOpposite;
        }
    }

    const virtualCorner = {
        x: foldedLength + adjacent,
        y: pageSize.height - opposite,
    };

    // Now we want to calculate the height of the page that's visible at the side
    // We know th base of the triangle is the mouse left position (X)
    // We know the angle of the triangle is 90 - angle (Angle)
    // Using trigonometry we can calculate the height of the triangle (Hypotenuse)
    // cos(angle) = adjacent / hypotenuse
    // hypotenuse = adjacent / cos(angle)
    // hypotenuse = X / cos(angle)

    let foldedHeight =
        angle > 0
            ? clamp(
                  virtualCorner.x / Math.cos(((90 - angle) * Math.PI) / 180),
                  0,
                  pageSize.height
              )
            : clamp(
                  virtualCorner.x / Math.cos(((90 + angle) * Math.PI) / 180),
                  0,
                  pageSize.height
              );

    // Now we want to calculate the length of the page that's visible folded at the top
    // Again we know that this length is equal to the length of the base page that's visible at the top
    // So if we calculate the height of the top-right corner of the page that overlaps the top
    // As we already know the angle, we can calculate the hypotenuse of the triangle
    // Giving us the length of the page that's folded at the top

    // So first, to calculate the height of the top-right corner of the page that overlaps the top
    // We need the height of the top-left corner of the page

    const falopa = Math.sin(((90 - angle) * Math.PI) / 180) * pageSize.height;

    // Then calculate the height of the top-right corner of the page

    const topRightCornerHeight = opposite + falopa;

    // Then we subtract the height of the top-right corner to the height of the page

    const topRightCornerOverlap = topRightCornerHeight - pageSize.height;
    // Then we calculate the length of the page that's folded at the top

    let topFoldedLength = clamp(
        topRightCornerOverlap / Math.sin((angle * Math.PI) / 180),
        0,
        pageSize.width
    );

    if (angle < 0) topFoldedLength = 0;
    if (virtualCorner.y > pageSize.height) {
        foldedHeight = pageSize.height;
        topFoldedLength = clamp(
            -topRightCornerOverlap / Math.tan(((360 - angle) * Math.PI) / 180),
            0,
            pageSize.width
        );
    }

    // console.log(topLeftCornerHeight, opposite, falopa);

    const correctedAngle =
        virtualCorner.y > pageSize.height || angle > 0 ? -angle : 180 - angle;

    return {
        foldedLength,
        foldedHeight,
        topFoldedLength,
        virtualCorner,
        correctedAngle,
    };
};
