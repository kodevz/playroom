import React, { ComponentType, useContext, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs'
// import scraper from "website-scraper"
import $ from "jquery";
// import lzString from 'lz-string';
// import localforage from 'localforage';
// import { useParams } from '../utils/params';
import { compileJsx } from '../utils/compileJsx';
import SplashScreen from './SplashScreen/SplashScreen';

// @ts-ignore
import styles from './Preview.less';

// @ts-ignore
import CatchErrors from './CatchErrors/CatchErrors';
// @ts-ignore
import RenderCode from './RenderCode/RenderCode';
import { StoreContext } from '../StoreContext/StoreContext';
// import playroomConfig from '../config';

// interface PreviewState {
//   code?: string;
//   themeName?: string;
// }

export interface PreviewProps {
  components: Record<string, ComponentType>;
  themes: Record<string, any>;
  FrameComponent: ComponentType<{ themeName: string; theme: any }>;
}
export default ({ themes, components, FrameComponent }: PreviewProps) => {
  //const { themeName, code } = useParams(
  // //   (rawParams): PreviewState => {
  // //     if (rawParams.code) {

  // //       const result = JSON.parse(
  // //         lzString.decompressFromEncodedURIComponent(String(rawParams.code)) ??
  // //           ''
  // //       );



  // //       return {
  // //         code: compileJsx(result.code),
  // //         themeName: result.theme,
  // //       };
  // //     }

  // //     return {};
  // //   }
  // );

  useEffect( () => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    let tempInfo = Object.fromEntries(params.entries());
    let publish = params.get('publish');

    if(publish === "true") {
      $(function() { 
        setTimeout(() => {
          $('script').remove();
          $('#preview_container').next().remove();
          let htmlString = $('body')[0].innerHTML
          axios({
            method: 'post',
            url: 'https://ih3rvualfb.execute-api.ap-south-1.amazonaws.com/dev/products/tempData',
            data: qs.stringify({
              htmlString: htmlString,
              tempInfo : tempInfo
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }).then(res => {
            if(res.data.statusCode === 'success') {
              alert("Template Generation Success")
            }else {
              alert("Template Generation Failed for some reason!!!")
            }
          })
        }, 5000)
      });
    }
  },[])

  const [storeObj] = useContext(
    StoreContext
  );

  const code  = compileJsx(storeObj.code);
  const themeName = '';
  const resolvedTheme = themeName ? themes[themeName] : null;

  return (
    <CatchErrors code={code}>
      <div className={styles.renderContainer} id="preview_container">
        <FrameComponent
          themeName={themeName || '__PLAYROOM__NO_THEME__'}
          theme={resolvedTheme}
        >
          <RenderCode code={code} scope={components} />
        </FrameComponent>
      </div>
      <div className={styles.splashScreenContainer}>
        <SplashScreen />
      </div>
    </CatchErrors>
  );
};
