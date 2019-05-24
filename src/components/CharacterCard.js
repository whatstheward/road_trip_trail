import React from 'react'
import {Card, Image, Icon} from 'semantic-ui-react'
const CharacterCard =(props)=>{

    return(
        <Card>
            <Card.Content>
            <Image size="small" src='https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFro&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Heather&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=DarkBrown'></Image>
                <Card.Header> Character Name </Card.Header>
                <p><Icon name='heart' size='small' /> Morale </p>
            </Card.Content>
        </Card>
    )
}

export default CharacterCard