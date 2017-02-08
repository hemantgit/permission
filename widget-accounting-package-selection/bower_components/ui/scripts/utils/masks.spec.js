
'use strict';
var Mask = require('./masks');

describe('UI stringMask utility', function() {
    var StringMask;

    beforeEach(function() {
        StringMask = Mask.StringMask;
    });

    it('should export a function', function() {
        expect(StringMask).toBeFunction();
    });

    it('should have functions', function() {
        var functions = [
            'process', 'apply', 'validate'
        ];
        functions.forEach(function(fn) {
            expect(StringMask[fn]).toBeFunction();
        });

    });

    describe('Specific mask tests', function() {
        it('should return correct number', function() {
            var formatter = new StringMask('#0', {reverse: true}),
                formattedNumber;

            formattedNumber = formatter.apply('123456');
            expect(formattedNumber).toBe('123456');

            formattedNumber = formatter.apply('9');
            expect(formattedNumber).toBe('9');
        });

        it('should format number with decimals and thousands separators', function() {
            var formatter = new StringMask('#.##0,00', {reverse: true}),
                formattedNumber;

            formattedNumber = formatter.apply('123456');

            expect(formattedNumber).toBe('1.234,56');

            formattedNumber = formatter.apply('9');
            expect(formattedNumber).toBe('0,09');
        });

        it('should format date and time ', function() {
            var formatter = new StringMask('00/00/9900', {reverse: true}),
                formattedNumber;

            formattedNumber = formatter.apply('03051982');

            expect(formattedNumber).toBe('03/05/1982');
        });
    });

    describe('prepareNumberToFormatter', function() {
        it('should be a function', function() {
            expect(Mask.prepareNumberToFormatter).toBeFunction();
        });

        it('should return number without leading zeros and decimals', function() {
            var decimals = 2,
                preparedNumber;

            preparedNumber = Mask.prepareNumberToFormatter('003432.40', decimals);
            expect(preparedNumber).toBe('343240');
        });
    });

    describe('numberMask', function() {
        it('should be a function', function() {
            expect(Mask.numberMask).toBeFunction();
        });

        it('should return instance of StringMask object with correct mask pattern', function() {
            var decimals = 2,
                decimalDelimiter = '.',
                thousandsDelimiter = ',',
                mask;

            mask = Mask.numberMask(decimals, decimalDelimiter, thousandsDelimiter);
            expect(mask).toBeObject();
            expect(mask.pattern).toBe('#,##0.00');

            decimals = 3;
            decimalDelimiter = ',';
            thousandsDelimiter = '.';
            mask = Mask.numberMask(decimals, decimalDelimiter, thousandsDelimiter);
            expect(mask.pattern).toBe('#.##0,000');
        });
    });

    describe('decimalMask', function() {
        it('should be a function', function() {
            expect(Mask.decimalMask).toBeFunction();
        });

        it('should return instance of StringMask object with correct mask pattern', function() {
            var decimals = 2,
                mask = Mask.decimalMask(decimals);

            expect(mask).toBeObject();
            expect(mask.pattern).toBe('###0.00');
        });
    });

});

