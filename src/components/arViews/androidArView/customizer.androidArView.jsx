/* eslint-disable react/prop-types */
import React from "react";
// import styles from '../../styles.module.scss';
import { ARViewer } from "./customizer.arviewer";


export const AndroidArView = ({ mesh }) => {
  const [androidAr, setAndroidAr] = React.useState<ARViewer>(null);

  React.useEffect(() => {
    setAndroidAr(new ARViewer());
  }, []);

  React.useEffect(() => {
    return () => {
      if (androidAr) {
        androidAr.hideCanvas();
      }
    };
  }, [androidAr]);

  React.useEffect(() => {
    if (mesh && androidAr) {
      androidAr.setModel(mesh);
      androidAr.showCanvas();
    }
  }, [mesh, androidAr]);

  return (
    <>
      {androidAr ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#467D86"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            // console.log('buttoon')
            androidAr.clickButton()
          }}
        >
          <path d="M10.679 15.7641L9.62103 16.3388V15.1037C9.62103 14.7943 9.40969 14.5075 9.10462 14.4578C8.71576 14.3945 8.37966 14.6931 8.37966 15.0705V16.3391L7.3217 15.7644C7.04984 15.6167 6.69667 15.6651 6.50674 15.9096C6.26529 16.2209 6.36739 16.6591 6.69884 16.8394L8.68907 17.921C8.88335 18.0265 9.11734 18.0265 9.31162 17.921L11.3018 16.8394C11.6333 16.6594 11.7354 16.2209 11.494 15.9096C11.3043 15.6651 10.9512 15.6164 10.679 15.7641Z" />
          <path d="M3.35449 2.97802L1.22243 4.13653C1.04305 4.23398 0.931641 4.42173 0.931641 4.62594V7.23251C0.931641 7.54192 1.14298 7.82868 1.44805 7.87833C1.83691 7.94164 2.17301 7.64309 2.17301 7.26572V5.70779L3.2617 6.29931C3.35573 6.3502 3.45721 6.37441 3.55714 6.37441C3.79145 6.37441 4.01769 6.24189 4.12321 6.00945C4.26069 5.70655 4.11173 5.3478 3.81938 5.1889L2.85266 4.66349L3.97642 4.05305C4.30755 3.87305 4.40997 3.43546 4.16883 3.12357C3.97952 2.87871 3.62666 2.82967 3.3548 2.9774L3.35449 2.97802Z" />
          <path d="M11.5539 1.29754L9.31139 0.0791375C9.11742 -0.0263792 8.88311 -0.0263792 8.68884 0.0791375L6.44289 1.29972C6.15768 1.45489 6.00903 1.80154 6.13503 2.10071C6.27965 2.44488 6.68495 2.58143 7.0043 2.40795L9.00011 1.32361L10.9959 2.40795C11.09 2.45885 11.1914 2.48305 11.2914 2.48305C11.5257 2.48305 11.7519 2.35054 11.8574 2.11809C11.9949 1.8152 11.8463 1.45644 11.5539 1.29754Z" />
          <path d="M10.7097 7.07552L9.00034 8.00438L7.29097 7.07552C6.98994 6.91228 6.61287 7.0237 6.44932 7.32504C6.28577 7.62607 6.39749 8.00345 6.69884 8.167L8.37965 9.08034V11.0234C8.37965 11.3663 8.65772 11.6444 9.00034 11.6444C9.34296 11.6444 9.62103 11.3663 9.62103 11.0234V9.08034L11.3018 8.167C11.6032 8.00314 11.7149 7.62607 11.5514 7.32504C11.3875 7.0237 11.0111 6.91228 10.7097 7.07552Z" />
          <path d="M3.94179 13.9279L2.17252 12.9668V10.7674C2.17252 10.458 1.96118 10.1712 1.65611 10.1215C1.26725 10.0582 0.931152 10.3568 0.931152 10.7342V13.3743C0.931152 13.5785 1.04288 13.7662 1.22194 13.8637L3.38379 15.0383C3.47783 15.0892 3.57931 15.1134 3.67924 15.1134C3.91355 15.1134 4.13979 14.9809 4.24531 14.7484C4.38279 14.4456 4.23382 14.0868 3.94148 13.9279H3.94179Z" />
          <path d="M14.6162 2.96195C14.2969 2.78846 13.8919 2.92439 13.7472 3.26856C13.6212 3.56836 13.7705 3.91563 14.056 4.0708L15.1478 4.66387L14.1792 5.19021C13.8875 5.34879 13.7395 5.70755 13.8773 6.00951C13.9834 6.24196 14.2093 6.37448 14.4433 6.37448C14.5433 6.37448 14.6447 6.35027 14.7388 6.29938L15.8275 5.70786V7.23258C15.8275 7.54199 16.0388 7.82875 16.3439 7.8784C16.7327 7.94171 17.0688 7.64316 17.0688 7.26578V4.62569C17.0688 4.42149 16.9571 4.23373 16.778 4.13628L14.6162 2.96195Z" />
          <path d="M16.3438 10.1219C16.0387 10.1716 15.8274 10.4583 15.8274 10.7677V12.9671L14.0581 13.9283C13.7658 14.0868 13.6168 14.4459 13.7543 14.7488C13.8598 14.9813 14.0864 15.1138 14.3204 15.1138C14.4203 15.1138 14.5218 15.0896 14.6158 15.0387L16.7777 13.864C16.957 13.7666 17.0685 13.5788 17.0685 13.3746V10.7345C17.0685 10.3575 16.7324 10.0586 16.3435 10.1219H16.3438Z" />
        </svg>
      ) : (
        ""
      )}
    </>
  );
};
