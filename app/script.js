import Aragon from '@aragon/client'

const app = new Aragon()

const initialState = {
  count: 0
}
// Internally, store will fetch the last known state (if any) and pass that in as the first argument,
// and then store the resulting state in cache.
// This state can be observed in the view portion of your app.
// Also note that the store method returns an observable of states.
app.store(async (state, event) => {
  if (state === null) state = initialState

  switch (event.event) {
    case 'RequestCreated':
      console.log('RequestCreated event emitted');
      console.log(event);
      let rows;
      try {
        rows = await getRequests()
      } catch(e) {
        console.log(e)
      }
      return {rows}
    default:
      return state
  }
})

function getRequestsCount() {
  // Get current value from the contract by calling the public getter
  return new Promise(resolve => {
    app
      .call('getRequestsCount')
      .first()
      // .map(value => parseInt(value, 10))
      .subscribe(resolve)
  })
}

function getRequestId(index) {
  return new Promise(resolve => {
    app
      .call('requests', index)
      .first()
      // .map(value => parseInt(value, 10))
      .subscribe(resolve)
  })
}

function getRequest(id) {
  return new Promise(resolve => {
    app
      .call('getRequest', id)
      .first()
      // .map(value => parseInt(value, 10))
      .subscribe(resolve)
  })
}

async function getRequests() {
  let rows = []
  const len = await getRequestsCount();
  console.log('len', len)
  for(let i = 0; i < len; i++) {
    const id = await getRequestId(i);
    const req = await getRequest(id);
    console.log(i, req)
    rows.push({
      id,
      payer: req.payer,
      status: req.state,
      amount: req.payeeExpectedAmount}
    );
  }
  console.log('rows in worker', rows);
  return rows;
}

module.exports = app;