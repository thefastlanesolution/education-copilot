import { Page, Text, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const PDF = props => {
  const {
    subject,
    firstDefinition,
    firstExample,
    firstExample2,
    secondDefinition,
    secondExample,
    secondExample2,
    thirdDefinition,
    thirdExample,
    thirdExample2,
    fourthDefinition,
    fourthExample,
    fourthExample2,
    fifthDefinition,
    fifthExample,
    fifthExample2,
    sixthDefinition,
    sixthExample,
    sixthExample2,
    seventhDefinition,
    seventhExample,
    seventhExample2,
    eighthDefinition,
    eighthExample,
    eighthExample2,
    ninthDefinition,
    ninthExample,
    ninthExample2,
    tenthDefinition,
    tenthExample,
    tenthExample2,
    firstWord,
    secondWord,
    thirdWord,
    fourthWord,
    fifthWord,
    sixthWord,
    seventhWord,
    eighthWord,
    ninthWord,
    tenthWord,
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
        <Text style={styles.title}>Context for: {subject}</Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Vocabulary Terms</Text>
          <Text style={styles.aim}>
            {'\n'}
            {'\n'}
            {firstWord}
            {'\n'}
            {secondWord}
            {'\n'}
            {thirdWord}
            {'\n'}
            {fourthWord}
            {'\n'}
            {fifthWord}
            {'\n'}
            {sixthWord}
            {'\n'}
            {seventhWord}
            {'\n'}
            {eighthWord}
            {'\n'}
            {ninthWord}
            {'\n'}
            {tenthWord}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{firstWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {firstDefinition}
            {'\n'}
            {'\n'}
            {firstExample}
            {'\n'}
            {'\n'}
            {firstExample2}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{secondWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {secondDefinition}
            {'\n'}
            {'\n'}
            {secondExample}
            {'\n'}
            {'\n'}
            {secondExample2}
          </Text>
        </Text>

        <Text style={styles.title} break>
          Context for: {subject}
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{thirdWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {thirdDefinition}
            {'\n'}
            {'\n'}
            {thirdExample}
            {'\n'}
            {'\n'}
            {thirdExample2}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{fourthWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {fourthDefinition}
            {'\n'}
            {'\n'}
            {fourthExample}
            {'\n'}
            {'\n'}
            {fourthExample2}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{fifthWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {fifthDefinition}
            {'\n'}
            {'\n'}
            {fifthExample}
            {'\n'}
            {'\n'}
            {fifthExample2}
          </Text>
        </Text>

        <Text style={styles.title} break>
          Context for: {subject}
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{sixthWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {sixthDefinition}
            {'\n'}
            {'\n'}
            {sixthExample}
            {'\n'}
            {'\n'}
            {sixthExample2}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{seventhWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {seventhDefinition}
            {'\n'}
            {'\n'}
            {seventhExample}
            {'\n'}
            {'\n'}
            {seventhExample2}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{eighthWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {eighthDefinition}
            {'\n'}
            {'\n'}
            {eighthExample}
            {'\n'}
            {'\n'}
            {eighthExample2}
          </Text>
        </Text>

        <Text style={styles.title} break>
          Context for: {subject}
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{ninthWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {ninthDefinition}
            {'\n'}
            {'\n'}
            {ninthExample}
            {'\n'}
            {'\n'}
            {ninthExample2}
          </Text>
        </Text>
        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>{tenthWord}</Text>
          <Text style={styles.goal}>
            {'\n'}
            {'\n'}Definition: {tenthDefinition}
            {'\n'}
            {'\n'}
            {tenthExample}
            {'\n'}
            {'\n'}
            {tenthExample2}
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
export default PDF;
