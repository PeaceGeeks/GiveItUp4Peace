/*!
 * Chimpify - v1.0
 * Built by Bene - Created at Chimp.net
 */

 (function(window, $){
  var Chimpify = function(elem, options){
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
    this.metadata = this.$elem.html5data('chimp');
  };

  Chimpify.prototype = {
    defaults: {
      staging: false,
    },
    init: function() {
      this.config = $.extend({}, this.defaults, this.options, this.metadata);
      var _root = this;
      if(this.config.type) {
        switch(this.config.type) {
          case 'campaign-groups': // Campaign Giving Groups
            $.ajax({
              type: 'GET',
              url: 'https://chimp.net/api/v1/campaigns/active_groups?api_key='+this.config.apiKey+'&campaign='+this.config.campaignId+'&num_groups='+this.config.numGroups+'&num_days='+this.config.numDays,
              dataType: 'json',
              headers: {},
              success: function(response){
                $(_root.elem).empty();
                $.each(response, function(index, object) {
                  var moneyRaised = _root.formatNumber(Math.round(parseFloat(object.funds_raised)));
                  $(_root.elem).append(
                    // '<div class="col-md-3 col-sm-3">' +
                        '<a href="' + object.url + '" target="_blank"><div class="column-flex">' +
                            '<img src="' + object.logo + '" alt="" class="thumb-icon"/>' +
                            '<h3>$' +
                              moneyRaised +
                            '</h3>' +
                            '<h4>' + object.name + '</h4> ' +
                            // '<div class="view">' +
                            //   'View Group' +
                            // '</div>' +
                          '</a>' +
                      '' +
                    '</div>'
                  );
                });
              }
            });
            break;

          case 'numbers-amount':    // Nice useful totals
          case 'numbers-charities':
            $.ajax({
              type: 'GET',
              url: 'http://go.chimp.net/chimp-numbers.xml',
              dataType: 'xml',
              success: function(xml){
                $(xml).find('CHIMPNUMBERS').each(function(){
                  var amount = (_root.config.type == 'numbers-amount') ? $(this).find('AMOUNT').text() : $(this).find('CHARITIES').text();;
                  $(_root.elem).text(amount);
                });
              }
            });
            break;

          case 'campaign-total': // Total Raised So Far
            $.ajax({
              type: 'GET',
              url: 'https://chimp.net/api/v1/campaigns/stats?api_key='+this.config.apiKey+'&campaign='+this.config.campaignId+'&sum_results=true',
              dataType: 'json',
              async:false,
              headers: {},
              success: function(response){
                var moneyRaised = Math.round(parseFloat(response.money_raised));
                $(_root.elem).text("$" + _root.formatNumber(moneyRaised));
              }
            });
            break;

          case 'campaign-stats': // Campaign Stats
            $.ajax({
              type: 'GET',
              url: 'https://chimp.net/api/v1/campaigns/stats?api_key='+this.config.apiKey+'&campaign='+this.config.campaignId,
              dataType: 'json',
              async:false,
              headers: {},
              success: function(response){
                var moneyRaised = Math.round(parseFloat(response.money_raised));
                $(_root.elem).append(
                  '' +
                    '<div class="team-rows">' +
                          '<a href="' + response.campaign_url + '">' +
                            '<div class="thumb-icon">' +
                              '<img src="' + response.campaign_logo + '" alt="" id="stats-icon" />' +
                            '</div>' +
                          '</a>' +
                          '<div class="team-name" id="stats">' +
                            '<a id="team-url" href="' + response.campaign_url + '">' +
                              '' + response.name.slice(20,40) + '' +
                              '</a>' +
                            '</div>' +
                        '</div>' +
                      ''
                        // '<div class="donors">' +
                        // response.donors + ' donors' +
                        // '</div>' +
                        // '<div class="members">' +
                        // response.members + ' members' +
                        // '</div>' +
                        // '<div class="groups">' +
                        // response.groups + ' groups' +
                        // '</div>' +
                        // '<div class="price">$' +
                        //   moneyRaised + ' raised' +
                        // '</div>' +
                );
              }
            });
            break;
        }
      }
      return this;
    },
    formatNumber: function(num) {
  		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  	}
  }

  Chimpify.defaults = Chimpify.prototype.defaults;

  $.fn.chimpify = function(options) {
    return this.each(function() {
      new Chimpify(this, options).init();
    });
  };

  window.Chimpify = Chimpify;
})(window, jQuery);
