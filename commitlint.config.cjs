module.exports = {
  extends: [], // ['@commitlint/config-conventional']
  rules:{
    'header-min-length':[2,'always',20],
    'header-capital-first-letter':[2,'always'],
    'header-end-period':[2,'always']
  },
  plugins:[
    {
      rules:{
        'header-capital-first-letter': ({raw})=>{
          return [
            /^[A-Z]/.test(raw),
            'Commit message should start with a capital letter.'
          ];
        },
        'header-end-period': ({header})=>{
          return [
            /\.$/.test(header),
            'Commit message must end with period.'
          ];
        },
      }
    }
  ]
};