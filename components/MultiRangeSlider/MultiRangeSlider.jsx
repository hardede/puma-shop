import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import useDebounce from "../../hooks/useDebounce";
import { sortByPriceRange } from "../../store/reducers/ProductSlice";

const MultiRangeSlider = ({ min, max, sneakers, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const debouncedValue = useDebounce(minVal, maxVal, 500);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const myPath = router.pathname.split("/")[1];

  const getPercent = useCallback(
    value => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange, debouncedValue]);

  return (
    <Link
      href={{
        pathname: `/${myPath}/[sorted]`,
        query: { sorted: `price-${minVal}-${maxVal}` },
      }}
    >
      <div
        draggable="false"
        onChange={() =>
          dispatch(sortByPriceRange({ sneakers, minVal, maxVal }))
        }
      >
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={event => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > max - 100,
          })}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={event => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />

        <div className="range__slider">
          <div className="range__slider__track" />
          <div ref={range} className="range__slider__range" />
          <div className="flex justify-between">
            <div className="range__slider__left-col">
              <p className="range__slider__from">from: </p>
              <div className="range__slider__left-value">{minVal}</div>
            </div>
            <span className="mt-[30px]">-</span>
            <div className="range__slider__right-col">
              <p className="range__slider__to">to: </p>
              <div className="range__slider__right-value">{maxVal}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MultiRangeSlider;
