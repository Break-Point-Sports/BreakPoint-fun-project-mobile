import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const ConfirmCodeInput = () => {
  const refInputOne = useRef();
  const refInputTwo = useRef();
  const refInputThree = useRef();
  const refInputFour = useRef();
  const refInputFive = useRef();
  const refInputSix = useRef();

  const [firstDigit, setFirstDigit] = useState('');
  const [secondDigit, setSecondDigit] = useState('');
  const [thirdDigit, setThirdDigit] = useState('');
  const [fourthDigit, setFourthDigit] = useState('');
  const [fifthDigit, setFifthDigit] = useState('');
  const [sixthDigit, setSixthDigit] = useState('');
  const [focusedElement, setFocusedElement] = useState(0);
  const inputRef = useRef(null);

  const code = [
    firstDigit,
    secondDigit,
    thirdDigit,
    fourthDigit,
    fifthDigit,
    sixthDigit,
  ];
  const setCode = [
    setFirstDigit,
    setSecondDigit,
    setThirdDigit,
    setFourthDigit,
    setFifthDigit,
    setSixthDigit,
  ];
  const refs = [
    refInputOne,
    refInputTwo,
    refInputThree,
    refInputFour,
    refInputFive,
    refInputSix,
  ]

  const onInput = (target, value ) => {
    if (value === '') {
      setCode[target]('');
      return;
    }
    if (!/^[0-9]*$/.test(value) || (value.length > (6 - target))) {
      return;
    }

    for (let i = 0; i < value.length; i ++) {
      setCode[target + i](value.charAt(i))
    }

    if (target + value.length <= 5) {
      refs[target + value.length].current.focus()
    }
  };

  return (
    <View
      ref={inputRef}
      style={styles.codeInputContainer}
    >
      <TextInput
        autoFocus
        keyboardType={'number-pad'}
        onChangeText={value => {
          onInput(0, value)
        }}
        ref={refInputOne}
        style={styles.codeTextInput}
        value={firstDigit}
    
      />
      <TextInput 
        keyboardType={'number-pad'}
        onChangeText={value => {
          onInput(1, value)
        }}
        ref={refInputTwo}
        style={styles.codeTextInput}
        value={secondDigit}
      />
      <TextInput 
        keyboardType={'number-pad'}
        onChangeText={value => {
          onInput(2, value)
        }}
        ref={refInputThree}
        style={styles.codeTextInput}
        value={thirdDigit}
      />
      <TextInput 
        keyboardType={'number-pad'}
        onChangeText={value => {
          onInput(3, value)
        }}
        ref={refInputFour}
        style={styles.codeTextInput}
        value={fourthDigit}
      />
      <TextInput
        keyboardType={'number-pad'}
        onChangeText={value => {
          onInput(4, value)
        }}
        ref={refInputFive}
        style={styles.codeTextInput}
        value={fifthDigit}
      />
      <TextInput 
        keyboardType={'number-pad'}
        onChangeText={value => {
          onInput(5, value)
        }}
        ref={refInputSix}
        style={styles.codeTextInputLast}
        value={sixthDigit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  codeInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 320,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#9C11E6',
    borderRadius: 28,
  },
  codeTextInput: {
    width: 40,
    marginRight: 10,
    height: 40,
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    marginBottom: 4,
    fontSize: 28,
  },
  codeTextInputLast: {
    width: 40,
    height: 40,
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    marginBottom: 4,
    fontSize: 28,
  },
});

export default ConfirmCodeInput;










































































