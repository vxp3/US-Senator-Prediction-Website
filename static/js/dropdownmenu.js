var pic_url
function init() {
  var dropDown = d3.select('#selDataset')
  d3.csv('data/images.csv').then(data => {
    pic_url = data
  })
  // use state to populate the options
  d3.json('data/us-senator.json').then(data => {
    var senator_info = data.objects
    var all_states = new Set()
    senator_info.forEach(senator => {
      all_states.add(senator.state)
    })

    Array.from(all_states)
      .sort()
      .forEach(state => {
        dropDown.append('option').text(state).property('value', state)
      })
    buildMeta(senator_info[0].state)
  })
}
init()

function optionChanged(senatorState) {
  buildMeta(senatorState)
}

function buildMeta(senatorState) {
  d3.json('data/us-senator.json').then(data => {
    var senator_info = data.objects
    var resultArray = senator_info.filter(i => i.state == senatorState)
    var senatorMetadata = d3.select('#sample-metadata')
    // clear any existing metadata
    senatorMetadata.html('')

    var partyColor = {
      Democrat: 'blue',
      Republican: 'red',
      Independent: 'purple'
    }
    resultArray.forEach(function (senator) {
      senatorMetadata
        .append('div')
        .attr('class', 'col-lg-6 ')
        .each(function () {
          let senatorName =
            senator.person.firstname + ' ' + senator.person.lastname
          let url = ''
          pic_url.forEach(function (s) {
            if (s['Senator'] == senatorName) {
              url = s['url_link_final']
            }
          })

          d3.select(this)
            .append('img')
            .style('max-width', '300px')
            .style('max-height', '300px')
            .attr('src', url)

          d3.select(this)
            .append('p')
            .each(function () {
              d3.select(this)
                .append('i')
                .style('border-style', 'solid')
                .style('border-width', 'thin')
                .style(
                  'background-color',
                  senator.party in partyColor
                    ? partyColor[senator.party]
                    : 'white'
                )
                .html('&nbsp;&nbsp;')
              d3.select(this)
                .append('a')
                .attr('href', senator.person.link)
                .text(' ' + senatorName)
            })
          d3.select(this)
            .append('p')
            .text('Party: ' + senator.party)
          d3.select(this)
            .append('p')
            .text('Rank: ' + senator.senator_rank_label)
          d3.select(this)
            .append('p')
            .text('Term: ' + senator.startdate + ' -- ' + senator.enddate)
          d3.select(this)
            .append('p')
            .text('Work Phone: ' + senator.phone)
          d3.select(this)
            .append('p')
            .text('Twitter ID: ' + senator.person.twitterid)
          d3.select(this)
            .append('p')
            .text('Youtube ID: ' + senator.person.youtubeid)
        })
    })
  })
}
