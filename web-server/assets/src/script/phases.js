$(()=>{
  $('h2#modules + ul').addClass('phase-modules-list')

  $('em:contains("P:")')
    .replaceWith(
      $('<i class="practice-module-icon glyphicon glyphicon-minus"></i>')
      .attr('title', 'Practive Module')
    )

  $('em:contains("B:")')
    .replaceWith(
      $('<i class="benchmark-module-icon glyphicon glyphicon-pushpin"></i>')
      .attr('title', 'Benchmark Module')
    )
})
