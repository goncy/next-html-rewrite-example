import Document from 'next/document';

export default function MyDocument() {
  return null;
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  let html = '';

  // Run the React rendering logic synchronously
  ctx.renderPage = () =>
    originalRenderPage({
      // Useful for wrapping the whole react tree
      enhanceApp: (App) =>
        function AppWrapper(props) {
          // If a page returns `__HTML` as props, we'll use it as the html entrypoint
          if (props.pageProps.__HTML) {
            html = props.pageProps.__HTML;
            return null;
          }
          return <App {...props} />;
        },
      // Useful for wrapping in a per-page basis
      enhanceComponent: (Component) => Component,
    });

  // Run the parent `getInitialProps`, it now includes the custom `renderPage`
  const initialProps = await Document.getInitialProps(ctx);

  return html ? { html } : initialProps;
};
