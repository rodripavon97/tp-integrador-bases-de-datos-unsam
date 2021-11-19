//
// Tomado de:
//            https://codesandbox.io/s/y8zfo
//

import React, { useState } from "react";
import { Box, Stack } from "@chakra-ui/layout";
import { StarIcon } from "@chakra-ui/icons";

const Rating = React.forwardRef(
  ({ size, icon, scale, fillColor, strokeColor, stackMy, initialValue }, ref) => {
    const [rating, setRating] = useState(initialValue? initialValue : 0);
    const buttons = [];

    const onClick = idx => {
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0);
        } else {
          setRating(idx);
        }
      }
    };

    const RatingIcon = ({ fill }) => {
      return (
        <StarIcon
          fontSize={`${size}em`}
          color={fillColor}
          stroke={strokeColor}
          onClick={onClick}
          fillOpacity={fill ? "100%" : "0"}
        />
      );
    };

    const RatingButton = ({ idx, fill }) => {
      return (
        <Box
          as="button"
          aria-label={`Rate ${idx}`}
          height={`${size}em`}
          width={`${size}em`}
          maxW="100%"
          variant="unstyled"
          onClick={() => onClick(idx)}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} />
        </Box>
      );
    };

    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
    }

    return (
      <Stack isInline my={stackMy ? stackMy : 4} justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
        {/* <Box width={`${size * 1.5}px`} textAlign="center">
          <Text fontSize="sm" textTransform="uppercase">
            Rating
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" lineHeight="1.2em">
            {rating}
          </Text>
        </Box> */}
      </Stack>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;