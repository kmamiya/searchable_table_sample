var csvParser = require('csv-parse');

var vue = new Vue({
  el: '#main',

  data: function () {
    return {
      postalCodes: [ ],
      records: [ ],
      sortColumn: -1,
      searchWordPostalCode: '',
      searchWordPrefectures: '',
      searchWordCity: '',
      searchWordAddress: ''
    };
  },

  computed: {
    postalCodeTester: function () {
      return this._createTester(this.searchWordPostalCode);
    },
    prefecturesTester: function () {
      return this._createTester(this.searchWordPrefectures);
    },
    cityTester: function () {
      return this._createTester(this.searchWordCity);
    },
    addressTester: function () {
      return this._createTester(this.searchWordAddress);
    }
  },

  created: function () {
    var _this = this;
    axios.get('./13tokyo.csv')
    .then(function (httpResponse) {
      csvParser(httpResponse.data, function (error, csvRecords) {
        console.log("Loading start, " + csvRecords.length + " records");
        for(var i = 0;i < csvRecords.length; i ++) {
          _this.postalCodes.push({
            postalCode_4digits: csvRecords[i][1],
            postalCode:         csvRecords[i][2],
            prefectures:        csvRecords[i][6],
            city:               csvRecords[i][7],
            address:            csvRecords[i][8]
          });
          if (i  % 1000 === 0) {
            console.log(i);
          }
        }
        console.log("done");
        _this.updateRecords();
      })
    })
    .catch(function (error) {
      console.log(error);
      alert("読み込み失敗");
    });
  },

  methods: {
    sort: function (event) {
      var sortTarget = event.target.getAttribute('data-col');
      if (sortTarget === 'postalCode') {
        this.sortColumn = 1;
      }
      if (sortTarget === 'prefectures') {
        this.sortColumn = 2;
      }
      if (sortTarget === 'city') {
        this.sortColumn = 3;
      }
      if (sortTarget === 'address') {
        this.sortColumn = 4;
      }
      this.$forceUpdate()
    },

    updateRecords: function () {
      this.records = [];
      for(var i = 0;i < this.postalCodes.length; i ++) {
        if (this.postalCodeTester !== undefined) {
          if (!this.postalCodeTester.test(this.postalCodes[i].postalCode)) {
            continue;
          }
        }
        if (this.prefecturesTester !== undefined) {
          if (!this.prefecturesTester.test(this.postalCodes[i].prefectures)) {
            continue;
          }
        }
        if (this.cityTester !== undefined) {
          if (!this.cityTester.test(this.postalCodes[i].city)) {
            continue;
          }
        }
        if (this.addressTester !== undefined) {
          if (!this.addressTester.test(this.postalCodes[i].address)) {
            continue;
          }
        }
        this.records.push(this.postalCodes[i]);
      }
    },

    formattedPostalCode: function (unformatted) {
      return unformatted.substring(0,3) + '-' + unformatted.substring(3);
    },

    _createTester: function (word) {
      return word === '' ? undefined : new RegExp('.*' + word + '.*');
    }
  },

  watch: {
    searchWordPostalCode: function () {
      this.updateRecords();
    },
    searchWordPrefectures: function () {
      this.updateRecords();
    },
    searchWordCity: function () {
      this.updateRecords();
    },
    searchWordAddress: function () {
      this.updateRecords();
    }
  }
});
