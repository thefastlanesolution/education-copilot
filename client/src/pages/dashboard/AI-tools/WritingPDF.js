import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const WritingPDF = props => {
  const { subject, promptTitle, promptBody, promptQuestions } = props;

  const styles = StyleSheet.create({
    wrapper: {
      borderColor: '#a665ff',
      borderWidth: 3,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 20,
    },
    headerFont: {
      fontFamily: 'Oswald',
      fontSize: 15,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      textAlign: 'left',
    },
    body: {
      paddingTop: 10,
      paddingBottom: 65,
      paddingHorizontal: 35,
      borderColor: '#a665ff',
      borderWidth: 2,
    },
    title: {
      fontSize: 24,
      paddingTop: 15,
      textAlign: 'left',
      fontFamily: 'Oswald',
    },
    aim: {
      paddingTop: 15,
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 12,
      textAlign: 'left',
      marginBottom: 20,
    },
    goal: {
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 12,
      textAlign: 'left',
      marginBottom: 20,
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>{promptTitle}</Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Written Sample</Text>
          <Text style={styles.goal}>
            {'\n'}
            {promptBody}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Questions for Students</Text>
          <Text style={styles.goal}>
            {'\n'}
            {promptQuestions}
          </Text>
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
export default WritingPDF;
