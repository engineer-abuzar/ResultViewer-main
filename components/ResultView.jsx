import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';

const ResultView = ({ route }) => {
  const { data } = route.params;

  // CSS for responsive design
  const mobileCSS = `
  <style type="text/css">
    body {
      font-family: Arial, sans-serif;
    }

    /* Center the content of paragraphs */
    p {
      text-align: center; /* This will center the images inside the paragraph tags */
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    table td, table th {
      padding: 8px;
      text-align: center;
    }

    table th {
      background-color: #f2f2f2;
    }

    /* Mobile Responsive Design */
    @media only screen and (max-width: 600px) {
      .style1 {
        font-size: 1.8em;
      }

      .style2 {
        font-size: medium;
      }

      table, th, td {
        font-size: 0.9em;
      }
      
      .control-group {
        font-size: large;
      }

      p {
        font-size: small;
      }

      
    }
  </style>
`;




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                ${mobileCSS}
              </head>
              <body>
                ${data}
              </body>
            </html>
          `
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default ResultView;
