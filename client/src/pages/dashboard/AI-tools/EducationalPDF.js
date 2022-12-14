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

const PDF = props => {
  const {
    subject,
    covers,
    gradeLevel,
    title,
    header1,
    body1,
    header2,
    body2,
    header3,
    body3,
    header4,
    body4,
    header5,
    body5,
    header6,
    body6,
    header7,
    body7,
    header8,
    body8,
  } = props;

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
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Handout Covers</Text>
          <Text style={styles.aim}>
            {'\n'}
            {covers}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{header1}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {body1}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{header2}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {body2}
          </Text>
        </Text>

        <Text style={{ fontFamily: 'Oswald', fontSize: 20 }} break>
          {title}
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{header3}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {body3}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{header4}</Text>
          <Text style={styles.goal}>
            {' '}
            {'\n'}
            {body4}
          </Text>
        </Text>

        <Text style={{ fontFamily: 'Oswald', fontSize: 20 }} break>
          {title}
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{header5}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {body5}
          </Text>
        </Text>

        {/* If header 6 is not equal to '' then render the header6 and body6 */}

        {header6 !== '' && (
          <Text style={styles.wrapper}>
            <Text style={styles.headerFont}>{header6}</Text>
            <Text style={styles.goal}>
              {'\n'}
              {body6}
            </Text>
          </Text>
        )}

        {/* If header 7 is not equal to '' then render the header7 and body7 */}

        {header7 !== '' && (
          <Text style={{ fontFamily: 'Oswald', fontSize: 20 }} break>
            {title}
          </Text>
        )}

        {header7 !== '' && (
          <Text style={styles.wrapper}>
            <Text style={styles.headerFont}>{header7}</Text>
            <Text style={styles.goal}>
              {'\n'}
              {body7}
            </Text>
          </Text>
        )}

        {/* If header 8 is not equal to '' then render the header8 and body8 */}
        {header8 !== '' && (
          <Text style={styles.wrapper}>
            <Text style={styles.headerFont}>{header8}</Text>
            <Text style={styles.goal}>
              {'\n'}
              {body8}
            </Text>
          </Text>
        )}

        {/* <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        /> */}
      </Page>
    </Document>
  );
};
export default PDF;
