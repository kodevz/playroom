import React,{useContext, useState} from 'react';
import { compileJsx } from '../utils/compileJsx';
import { useParams } from '../utils/params';
// @ts-ignore
import CatchErrors from './CatchErrors/CatchErrors';
// @ts-ignore
import RenderCode from './RenderCode/RenderCode';

interface FrameProps {
  themes: Record<string, any>;
  components: Array<any>;
  FrameComponent: React.ComponentType<{
    themeName: string | null;
    theme: string;
  }>;
}
export default function Frame({
  themes,
  components,
  FrameComponent,
}: FrameProps) {
  console.log("on load-->1")

  let { code, themeName } = useParams((rawParams) => {
    return {
      themeName:
        typeof rawParams.themeName === 'string' ? rawParams.themeName : '',
      code: typeof rawParams.code === 'string' ? rawParams.code : '',
    }
  });
  if(!code) {
    code = localStorage.getItem('code');
    code = compileJsx(code);
    console.log("code not exist in Frame-->",localStorage.getItem('code'));
  }
  const resolvedThemeName =
    themeName === '__PLAYROOM__NO_THEME__' ? null : themeName;
  const resolvedTheme = resolvedThemeName ? themes[resolvedThemeName] : null;

  return (
    <CatchErrors code={code}>
      <FrameComponent themeName={resolvedThemeName} theme={resolvedTheme}>
        <RenderCode code={code} scope={components} />
      </FrameComponent>
    </CatchErrors>
  );
}
