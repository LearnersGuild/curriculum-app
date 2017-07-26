module.exports = (path, data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: path,
      contentType : 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
    })
    .done(resolve)
    .fail(reject)
  })
}
