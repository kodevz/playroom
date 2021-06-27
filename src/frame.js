import React from 'react';
import { render } from 'react-dom';
import Frame from './Playroom/Frame';
import { StoreProvider } from './StoreContext/StoreContext';

const outlet = document.createElement('div');
document.body.appendChild(outlet);

const renderFrame = ({
  themes = require('./themes'),
  components = require('./components'),
  FrameComponent = require('./frameComponent'),
} = {}) => {
  render(
    <StoreProvider>
      <Frame
        components={components}
        themes={themes}
        FrameComponent={FrameComponent}
      />
    </StoreProvider>,
    outlet
  );
};
renderFrame();

if (module.hot) {
  module.hot.accept('./components', () => {
    renderFrame({ components: require('./components') });
  });

  module.hot.accept('./themes', () => {
    renderFrame({ themes: require('./themes') });
  });

  module.hot.accept('./frameComponent', () => {
    renderFrame({ FrameComponent: require('./frameComponent') });
  });
}
