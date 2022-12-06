import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

const MyReactPDF = props => {
  const { aimSection } = props;
  const { objectivesSection } = props;
  const { materialsSection } = props;
  const { anticipatorySection } = props;
  const { modeledSection } = props;
  const { guidedSection } = props;
  const { independentPractice } = props;
  const { struggleSection } = props;
  const { closureSection } = props;

  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  });

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
    bodyFont: {
      paddingLeft: 20,
      paddingRight: 60,
      fontSize: 12,
      textAlign: 'left',
      paddingBottom: 20,
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
    guidedPractice: {
      paddingTop: 15,
      paddingLeft: 20,
      paddingRight: 60,
      fontSize: 12,
      textAlign: 'left',
      paddingBottom: 20,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald',
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
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
        <Text style={styles.title}>Lesson Plan: Ecosystems</Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Lesson Aim</Text>
          <Text style={styles.aim}>
            {'\n'}
            {aimSection}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Student Objectives & Goals</Text>
          <Text style={styles.goal}>
            {'\n'}
            {objectivesSection}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Possible Materials Needed</Text>
          <Text style={styles.goal}>
            {'\n'}
            {materialsSection}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Anticipatory Set</Text>
          <Text style={styles.goal}>
            {'\n'}
            {anticipatorySection}
          </Text>
        </Text>

        <Text
          style={{
            fontFamily: 'Oswald',
            fontSize: 12,
            marginTop: 10,
            textAlign: 'left',
          }}
          break
        >
          Lesson Plan: Ecosystems
        </Text>
        <Text style={{ fontFamily: 'Oswald', fontSize: 20 }}>
          Modeled Practice & Guided Practice
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Modeled Practice Ideas</Text>
          <Text style={styles.bodyFont}>
            {'\n'}
            {modeledSection}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Guided Practice Ideas</Text>
          <Text style={styles.bodyFont}>
            {'\n'}
            {guidedSection}
          </Text>
        </Text>

        <Text
          style={{
            fontFamily: 'Oswald',
            fontSize: 12,
            marginTop: 10,
            textAlign: 'left',
          }}
          break
        >
          Lesson Plan: Ecosystems
        </Text>
        <Text style={{ fontFamily: 'Oswald', fontSize: 20 }}>
          Independent Practice, Areas of Struggle & Closure
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Independent Practice Ideas</Text>
          <Text style={styles.bodyFont}>
            {'\n'}
            {independentPractice}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Common Areas of Struggle</Text>
          <Text style={styles.bodyFont}>
            {'\n'}
            {struggleSection}
          </Text>
        </Text>

        <Text style={styles.wrapper}>
          <Text style={styles.headerFont}>Closure/Assessment</Text>
          <Text style={styles.bodyFont}>
            {'\n'}
            {closureSection}
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
export default MyReactPDF;
