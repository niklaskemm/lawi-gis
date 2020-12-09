module.exports = {
  test(req, res) {
    try {
      const TestMessage = "Test erfolgreich!"
      res.send(TestMessage)
    } catch (err) {
      res.status(500).send({
        err
      })
    }
  }
}
