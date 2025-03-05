const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Tu archivo de entrada
  output: {
    filename: 'bundle.js', // El nombre del archivo empaquetado
    path: path.resolve(__dirname, 'dist'), // La carpeta de salida
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias para simplificar rutas
    },
    extensions: ['.js', '.jsx'], // Asegúrate de que Webpack maneje archivos .jsx también
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Asegúrate de que tanto .js como .jsx se manejen
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Soporte para ES6 y React
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Para importar CSS
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Limpiar dist antes de cada compilación
    new HtmlWebpackPlugin({
      template: './public/index.html', // Plantilla HTML
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Reemplazamos contentBase con static
    },
    port: 3001, // Puerto del servidor de desarrollo
    hot: true, // Habilitar recarga en caliente
  },
  mode: 'development', // Modo de desarrollo, usa 'production' para producción
};