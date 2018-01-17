'use strict';

const expect = require('chai').expect;
const fs = require('fs');

describe('set 1', () => {
  describe('challenge 1', () => {
    it('should convert hex to base64', () => {
      const hexTo64 = require('../lib/hex-to-base64');
      expect(hexTo64('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'))
        .to.equal('SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t');
    });
  });

  describe('challenge 2', () => {
    it('should XOR two equal-length buffers', () => {
      const fixedXOR = require('../lib/fixed-xor');
      expect(fixedXOR('1c0111001f010100061a024b53535009181c', '686974207468652062756c6c277320657965'))
        .to.equal('746865206b696420646f6e277420706c6179');
    });
  });

  describe('challenge 3', () => {
    it('should decrypt single byte XOR', () => {
      const singleByteXor = require('../lib/single-byte-xor');
      expect(singleByteXor('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'))
        .to.equal("Cooking MC's like a pound of bacon");
    });
  });

  describe('challenge 4', () => {
    it('should detect single byte XOR cipher', () => {
      const detectSingleByteXor = require('../lib/detect-single-byte-xor');
      const file = fs.readFileSync('./test/data/challenge4.txt'); // eslint-disable-line no-sync
      expect(detectSingleByteXor(file))
        .to.equal('Now that the party is jumping');
    });
  });

  describe('challenge 5', () => {
    it('should use repeating key xor', () => {
      const repeatingKeyXor = require('../lib/repeating-key-xor');
      const clearText = "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal";
      const key = 'ICE';
      const cipher = '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f';
      expect(repeatingKeyXor(clearText, key))
        .to.equal(cipher);
    });
  });

  describe('challenge 6', () => {
    it('should calculate hamming distance', () => {
      const hamming = require('../lib/hamming');
      expect(hamming(Buffer.from('this is a test', 'ascii'), Buffer.from('wokka wokka!!!', 'ascii')))
        .to.equal(37);
    });

    it.only('should break repeating key XOR', () => {
      const breakRepeatingKeyXor = require('../lib/break-repeating-key-xor');
      const file = fs.readFileSync('./test/data/challenge6.txt'); // eslint-disable-line no-sync
      // const file = '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f';
      expect(breakRepeatingKeyXor(file))
        .to.equal('27');
    });
  });
});
