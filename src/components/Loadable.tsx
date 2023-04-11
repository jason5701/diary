import { Suspense } from 'react';
import { LinearProgress, styled } from '@mui/material';

const LoaderWarpper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
});

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense
      fallback={
        <LoaderWarpper>
          <LinearProgress color='primary' />
        </LoaderWarpper>
      }
    >
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
