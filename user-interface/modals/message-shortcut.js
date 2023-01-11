const { Modal, Blocks, Elements, Bits} = require('slack-block-builder');


module.exports = (textMessage, currentUser, competitorsList) => {
  const textInput = (actionId, value) => {
    return Elements.TextInput({
      actionId: actionId,
      initialValue: value,
      multiline: true 
    });
  };

  return Modal({ title: 'Send To Pintel', submit: 'Send', callbackId: 'submit-form' })
    .blocks(
      Blocks.Input({ label: 'Message', blockId: 'taskMessage'}).element(
        textInput('taskMessage', textMessage),
      ),
      Blocks.Input({
        label: 'Select Competitor(s)',
        blockId: 'taskCompetitor'
      }).element(
        Elements.StaticMultiSelect({
          placeholder: 'Select competitors'
        }).actionId('competitor_selection').options( competitorsList.map(company => 
          Bits.Option({ text: company.competitor_name,
                        value: `${company.competitor_name}:${company.competitor_id}`
          }))
        )
      ),
      Blocks.Input({ label: 'user', blockId: 'taskCurrentUser',  dispatchAction: false }).element(
        Elements.UserSelect({
          actionId: 'taskCurrentUser',
         
        }).initialUser(currentUser),
      ),
    ).buildToJSON();
};
