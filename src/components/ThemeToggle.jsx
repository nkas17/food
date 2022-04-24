// import * as React from 'react';
//
// class ThemeToggle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       theme: 'light',
//     };
//     this.toggleTheme = this.toggleTheme.bind(this);
//   }
//
//   toggleTheme() {
//     const { theme } = this.state;
//     if (theme === 'light') {
//       this.setState({ theme: 'dark' });
//       const app = document.getElementById('app');
//       app.className = 'dark';
//     } else {
//       this.setState({ theme: 'light' });
//       const app = document.getElementById('app');
//       app.className = 'light';
//     }
//   }
//
//   render() {
//     const { theme } = this.state;
//     return (
//       // <button type="button" className="button button-link theme-toggle" onClick={this.toggleTheme}>
//       //   {theme}
//       // </button>
//       <></>
//     );
//   }
// }
//
// export default ThemeToggle;
