/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : utils.is.spec.js
 *  Description:
 *  Unit tests for module utils.is
 *  ----------------------------------------------------------------
 */

var is = require('../../scripts/modules/utils/is');
var _ = require('lodash');

/*----------------------------------------------------------------*/
/* Basic testing
/*----------------------------------------------------------------*/

describe('Core::Utils::is ', function () {

    it('should be an object', function () {
        expect(is).toBeObject();
    });

    //test isValidUUID function
    describe('#isValidUUID()', function () {
        it('should return true if string is a valid UUID', function () {
            var values = [
                '17f1a59d-582c-4cf4-8203-04736f47be8a',
                'fe8a82f6-36d5-11e5-a151-feff819cdc9f',
                '9c456dca-1937-4e37-9f63-c400c7ed249e',
                'aaea35d7-6125-48c0-ace2-082ff2eeb9e3',
                '2eb7450d-a98c-43ac-9b30-93a267b06c33',
                '896d773f-7a93-40e9-9872-275fb4a5cd58',
                '5787c774-36d6-11e5-a151-feff819cdc9f',
                '5787c878-36d6-11e5-a151-feff819cdc9f'
            ];

            values.forEach(function (value) {
                expect(is.isValidUUID(value)).toBe(true);
            });
        });

        it('should return false if string is not a valid UUID', function () {
            var values = [
                '5787c878-36d6-11e5-a151-feff819cdc9',
                'test',
                123,
                null,
                undefined,
                '',
                function () { }
            ];

            values.forEach(function (value) {
                expect(is.isValidUUID(value)).toBe(false);
            });
        });
    });

    describe('#isValidISO7064Checksum()', function () {
        var valid = [
            'SA0380000000608010167519',
            'CH9300762011623852957',
            'IL620108000000099999999',
            'AT611904300234573201',
            'BA391290079401028494',
            'BE68539007547034',
            'BE43068999999501',
            'BG80BNBG96611020345678',
            'CH9300762011623852957',
            'CY17002001280000001200527600',
            'CZ6508000000192000145399',
            'DK5000400440116243',
            'EE382200221020145685',
            'ES9121000418450200051332',
            'FR1420041010050500013M02606',
            'FI2112345600000785',
            'GB29NWBK60161331926819',
            'GI75NWBK000000007099453',
            'GR1601101250000000012300695',
            'HR1210010051863000160',
            'HU42117730161111101800000000',
            'IE29AIBK93115212345678',
            'IL620108000000099999999',
            'IS140159260076545510730339',
            'IT60X0542811101000000123456',
            'LI21088100002324013AA',
            'LT121000011101001000',
            'LU280019400644750000',
            'LV80BANK0000435195001',
            'MC1112739000700011111000H79',
            'ME25505000012345678951',
            'MK07250120000058984',
            'MT84MALT011000012345MTLCAST001S',
            'MU17BOMM0101101030300200000MUR',
            'NL91ABNA0417164300',
            'NO9386011117947',
            'PL61109010140000071219812874',
            'PT50000201231234567890154',
            'RO49AAAA1B31007593840000',
            'RS35260005601001611379',
            'SE9412312345678901234561',
            'SI56191000000123438',
            'SK3112000000198742637541',
            'SM86U0322509800000000270100',
            'TN5914207207100707129648',
            'TR330006100519786457841326'
        ];

        var invalid = {
            'GB82WEST1234569876543': 'GB IBANs must contain 22 characters.',
            'CA34CIBC123425345': 'CA is not a valid country code for IBAN.',
            'GB29ÉWBK60161331926819': 'is not a valid character for IBAN.',
            'SA0380000000608019167519': 'Not a valid IBAN.',
        };

        it('should return true if string is a valid iban', function () {
            valid.forEach(function (value) {
                !is.isValidISO7064Checksum(value) && console.log(value);
                expect(is.isValidISO7064Checksum(value)).toBe(true);
            });
        });

        it('should return false if string is not a valid iban', function () {
            _.each(invalid, function (error, value) {
                expect(is.isValidISO7064Checksum(value)).toBe(false);
            });
        });
    });

    describe('#isValidEmail()', function () {
        it('should return true if string is a valid email', function () {
            var values = [
                'test@iana.org', 'test@nominet.org.uk', 'test@about.museum', 'a@iana.org', 'test@e.com', 'test@iana.a', 'test.test@iana.org', '123@iana.org', 'test@123.com', 'test@iana.123', 'test@255.255.255.255', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghiklm@iana.org', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghiklmn@iana.org'
            ];

            values.forEach(function (value) {
                expect(is.isValidEmail(value)).toBe(true);
            });
        });

        it('should return false if string is not a valid email', function () {
            var values = [
                '5787c878-36d6-11e5-a151-feff819cdc9',
                'test',
                123,
                null,
                undefined,
                '',
                function () { },
                'test',
                '@',
                'test@',
                '@io',
                '@iana.org',
                '.test@iana.org',
                'test.@iana.org',
                'test..iana.org',
                'test_exa-mple.com',
                'test\@test@iana.org'
            ];

            values.forEach(function (value) {
                expect(is.isValidEmail(value)).toBe(false);
            });
        });
    });
});
