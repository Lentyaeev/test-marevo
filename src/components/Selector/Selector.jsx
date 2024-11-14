import React from "react";
import styles from "./Selector.module.scss";
import { colors, materials, metals } from "../../constants";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { isMobile } from "react-device-detect";

function Selector() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOptions, setSelectedOptions] = React.useState({
    body: colors[0].value,
    metal: metals[0],
    material: materials[0],
  });
  React.useEffect(() => {
    const colorParam = searchParams.get("body");
    const metalParam = searchParams.get("metal");
    const materialParam = searchParams.get("material");
    if (colorParam) {
      setSelectedOptions((prev) => ({ ...prev, body: colorParam }));
    }
    if (metalParam) {
      setSelectedOptions((prev) => ({ ...prev, metal: metalParam }));
    }
    if (materialParam) {
      setSelectedOptions((prev) => ({
        ...prev,
        material: materialParam,
      }));
    }
  }, [searchParams]);

  const changeOption = (name, value) => {
    setSelectedOptions((prev) => {
      const copy = { ...prev };
      copy[name] = value;
      return copy;
    });
    const newParams = new URLSearchParams(searchParams);
    newParams.set(name, value);
    setSearchParams(newParams);
  };

  return (
    <div className={styles.wrapper}>
      {isMobile ? (
        <div className={styles.mobileWrap}>
          <div className={styles.selector}>
            <div className={styles.title}>Body Color</div>
            <div className={styles.options}>
              {colors.map((color, index) => (
                <div
                  className={classNames(
                    styles.circleOption,
                    color.value === selectedOptions.body
                      ? styles.circleOption_active
                      : ""
                  )}
                  key={index}
                  onClick={() => changeOption("body", color.value)}
                >
                  <div
                    className={styles.circle}
                    style={{ backgroundColor: color.value }}
                  />
                  <p>{color.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.selector}>
            <div className={styles.title}>Metal Color</div>
            <div className={styles.options}>
              {metals.map((color, index) => (
                <div
                  className={classNames(
                    styles.circleOption,
                    color === selectedOptions.metal
                      ? styles.circleOption_active
                      : ""
                  )}
                  key={index}
                  onClick={() => changeOption("metal", color)}
                >
                  <div
                    className={styles.circle}
                    style={{ backgroundImage: `url(./metals/${color}.png)` }}
                  />
                  <p>{color}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.selector}>
            <div className={styles.title}>Body Color</div>
            <div className={styles.options}>
              {colors.map((color, index) => (
                <div
                  className={classNames(
                    styles.circleOption,
                    color.value === selectedOptions.body
                      ? styles.circleOption_active
                      : ""
                  )}
                  key={index}
                  onClick={() => changeOption("body", color.value)}
                >
                  <div
                    className={styles.circle}
                    style={{ backgroundColor: color.value }}
                  />
                  <p>{color.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.selector}>
            <div className={styles.title}>Metal Color</div>
            <div className={styles.options}>
              {metals.map((color, index) => (
                <div
                  className={classNames(
                    styles.circleOption,
                    color === selectedOptions.metal
                      ? styles.circleOption_active
                      : ""
                  )}
                  key={index}
                  onClick={() => changeOption("metal", color)}
                >
                  <div
                    className={styles.circle}
                    style={{ backgroundImage: `url(./metals/${color}.png)` }}
                  />
                  <p>{color}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div className={styles.selector}>
        <div className={styles.title}>Material</div>
        <div className={styles.options}>
          {materials.map((material, index) => (
            <div
              className={classNames(
                styles.roundOption,
                material === selectedOptions.material
                  ? styles.roundOption_active
                  : ""
              )}
              key={index}
              onClick={() => changeOption("material", material)}
            >
              <p>{material}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Selector;
