const tableBorderColor = '#eee';

export default {
  appBarTall: {
    height: 150
  },
  errorMessage: {
    color: 'rgb(244, 67, 54)'
  },
  input: {
    height: 29,
    marginTop: 34
  },
  inputError: {
    textAlign: 'left',
    top: 12
  },
  pageContent: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#eee',
    padding: 24
  },
  tableHeader: {
    border: `1px solid ${tableBorderColor}`,
    borderWidth: '1px 1px 0 1px',
    textTransform: 'uppercase'
  },
  tableHeaderRow: {
    border: 'none'
  },
  tableRow: {
    border: `1px solid ${tableBorderColor}`
  },
  tableActionColumn: {
    width: 50
  },
  twoColumnLayout: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: 'calc(100vh - 64px)'
  },
  secondaryNav: {
    zIndex: 1
  },
  uppercase: {
    textTransform: 'uppercase'
  }
};
