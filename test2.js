const { v4: uuid } = require('uuid');
const Big = require('big.js');

const gameType = [
  {
    id: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    name: 'Quick Quiz',
    loop: 1,
    cd: 1
  },
  {
    id: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    name: 'Minute Mind',
    loop: 5,
    cd: 5
  },
  {
    id: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    name: 'Express Exam',
    loop: 10,
    cd: 10
  }
]
const products = [
  {
    id: '788a31d8-ef3d-445a-b581-c1d11ac7fdba',
    name: 'Red',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: 'red',
    currency: 'trx',
    description: 'teest',
    category: 'color',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'a82811e3-6ac8-403b-a808-4d6f7ad882de',
    name: 'Green',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: 'green',
    currency: 'trx',
    description: 'teest',
    category: 'color',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'abede673-fce1-4c69-92bc-a513be53e918',
    name: 'Square',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: 'square',
    currency: 'trx',
    description: 'teest',
    category: 'shape',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'eb0846c7-b392-4c70-9876-a3f727f80132',
    name: 'Circle',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: 'circle',
    currency: 'trx',
    description: 'teest',
    category: 'shape',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '77d30803-0d88-45e0-8184-47e9e57247df',
    name: '1',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: '1',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '7ad228e4-e8c9-4e89-8b0d-ec389c4b2c43',
    name: '2',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: '2',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '8249b550-4e57-47e7-86b3-ac5e9bbec1d9',
    name: '3',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: '3',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '712a93f6-d7cc-42e3-bb23-d25b9278acbc',
    name: '4',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: '4',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'bfcfaa09-9bb1-49a1-a044-205398241521',
    name: '5',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: '5',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'd5371917-cf5e-441b-95ac-fe00cf495711',
    name: '6',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: '6',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'd2c2fc46-33c7-4806-8f31-91b92b7b253f',
    name: '7',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: '7',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'ea201f13-a16f-4c5f-bd68-bdea8ce9d47d',
    name: '8',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: '8',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'dc52228f-55b4-41a5-96c6-c2407638339f',
    name: '9',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: '9',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '5a00aacc-d596-4b1a-b594-5d67ddfc9f13',
    name: '10',
    gameTypeId: '9ee2905c-7d78-48f7-a383-692ab4e35339',
    cd: '10',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '48687bb3-1bf7-437b-8b29-5a8e399ab91b',
    name: 'Red',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: 'red',
    currency: 'trx',
    description: 'teest',
    category: 'color',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '1e236d34-cd36-4621-91c0-91386553ab3a',
    name: 'Green',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: 'green',
    currency: 'trx',
    description: 'teest',
    category: 'color',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'b6167826-6827-476c-8215-c39594cf1d82',
    name: 'Square',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: 'square',
    currency: 'trx',
    description: 'teest',
    category: 'shape',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'b1df1d56-707c-4da7-8523-7bbce2ec1cc6',
    name: 'Circle',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: 'circle',
    currency: 'trx',
    description: 'teest',
    category: 'shape',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '753f714e-af1a-424d-a33a-03372540899d',
    name: '1',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: '1',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '5125b6e8-29d6-4a0d-a4ce-0257ef9b5d1d',
    name: '2',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: '2',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '10626ca2-914b-43b5-8f9f-92a5c4dbf200',
    name: '3',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: '3',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '2ab25a3b-3e62-471c-b545-9915020bfd02',
    name: '4',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: '4',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'f3020d61-5cc0-4ccb-a0a1-72f7ad40b305',
    name: '5',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: '5',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '32f4ffe7-a770-4f16-bc61-161900ef4724',
    name: '6',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: '6',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'b8135804-51bf-42b5-9dba-1719ea1e4340',
    name: '7',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: '7',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '369aeb12-340e-4a83-a0a8-7d95841f81eb',
    name: '8',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: '8',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '3a526506-d8f0-41b9-846f-77654a3c2a42',
    name: '9',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: '9',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '4017c1f0-fcba-4e9f-a02f-570eb938657c',
    name: '10',
    gameTypeId: '29eddfc6-38ad-4443-bb1a-444c87d2877c',
    cd: '10',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '2044f89c-7c08-430c-837b-34fe434b7c70',
    name: 'Red',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: 'red',
    currency: 'trx',
    description: 'teest',
    category: 'color',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '97c5cda6-f291-47c3-a258-64b22a992fe3',
    name: 'Green',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: 'green',
    currency: 'trx',
    description: 'teest',
    category: 'color',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '2500747a-b985-41a5-9e27-3021e40c0c0c',
    name: 'Square',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: 'square',
    currency: 'trx',
    description: 'teest',
    category: 'shape',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'f95ecf4d-33de-4653-9ec4-b797a4a7a296',
    name: 'Circle',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: 'circle',
    currency: 'trx',
    description: 'teest',
    category: 'shape',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '7134117c-73f9-48c0-84fd-0cfd9c809860',
    name: '1',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: '1',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '1ffd55e0-6994-48fd-9991-aa44462262e8',
    name: '2',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: '2',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '387dab2a-3705-4202-abcc-0d4d0d9fcd75',
    name: '3',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: '3',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'd329cd5c-cdc6-49ed-b877-b93b6daac994',
    name: '4',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: '4',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '9acb72b4-a13e-413d-addd-e312887efed3',
    name: '5',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: '5',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '88ecb03b-453b-4c18-afec-63126b70026a',
    name: '6',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: '6',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'a0992a05-e1e6-4637-8b5c-86948f936fc0',
    name: '7',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: '7',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '69ff4657-3e3d-46c1-b9d9-4d3b19a2d114',
    name: '8',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: '8',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: 'e1898593-f764-4d13-a113-1ef1280bf02b',
    name: '9',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: '9',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  },
  {
    id: '78839b8f-0610-4b7d-b2c6-b0189ae312ea',
    name: '10',
    gameTypeId: 'f3a07353-be6b-446f-89ae-2e5597df7dce',
    cd: '10',
    currency: 'trx',
    description: 'teest',
    category: 'number',
    isActive: true,
    deleteFlag: false
  }
]

const usersGame = [
  {
    id: 'c94e8884-c24a-41ed-bc57-09f04ca54fdc',
    cifId: '1acd24e5-743a-4fe4-91e5-e3028866f60f',
    gameId: '43ce99d5-a470-463c-999b-e98f125ea639',
    productId: '69ff4657-3e3d-46c1-b9d9-4d3b19a2d114',
    spent: '165',
    result: 'PENDING'
  },
  {
    id: '9bfe2430-dd26-4a4e-ace3-dd17d19aa6a7',
    cifId: 'f17370c3-8752-421d-b688-68e9da0ae0ad',
    gameId: '2f0fdbcb-c1f2-4868-a686-5dbeb63bcbaa',
    productId: 'd5371917-cf5e-441b-95ac-fe00cf495711',
    spent: '227',
    result: 'PENDING'
  },
  {
    id: '3fe34aa9-b530-4829-ab63-3f0887132540',
    cifId: 'b17eef51-ac9e-4cdf-90c5-4c886202be6a',
    gameId: 'dd4679db-dfed-4be5-aaee-cb7af18bb6a1',
    productId: '7134117c-73f9-48c0-84fd-0cfd9c809860',
    spent: '138',
    result: 'PENDING'
  },
  {
    id: '126a678a-d390-4606-a40f-4d01025d9a57',
    cifId: '592ecb64-643c-4cca-a7b0-c335144eeb97',
    gameId: '536aadfb-ae06-47ec-a528-853f72a6eefa',
    productId: '69ff4657-3e3d-46c1-b9d9-4d3b19a2d114',
    spent: '658',
    result: 'PENDING'
  },
  {
    id: 'f15db52e-5df4-4348-b1f4-7b49ff60d958',
    cifId: 'c7b2c473-d480-4b62-88ec-4563e4f570d1',
    gameId: 'e5980562-512c-460b-a0eb-0680dc46d167',
    productId: '7ad228e4-e8c9-4e89-8b0d-ec389c4b2c43',
    spent: '368',
    result: 'PENDING'
  },
  {
    id: '472b355d-c2b6-4800-8119-3750e4308ce1',
    cifId: '272d137a-ea38-4fc6-a120-1ebdc55991d1',
    gameId: 'b8bda3a9-39ee-46e3-b8c4-39c2573badfd',
    productId: 'a82811e3-6ac8-403b-a808-4d6f7ad882de',
    spent: '484',
    result: 'PENDING'
  },
  {
    id: 'e25a7099-ef86-4b82-8156-b773e3254aaa',
    cifId: '91148340-4028-4193-8c33-bf36b44c6deb',
    gameId: '57e76198-e69e-41f6-ba74-90fabd22052d',
    productId: '3a526506-d8f0-41b9-846f-77654a3c2a42',
    spent: '130',
    result: 'PENDING'
  },
  {
    id: '682c92a8-0e00-4866-8be5-f05680123d44',
    cifId: '31736e42-b624-4256-b1de-e9a9293bd8e4',
    gameId: 'dbb1511f-77d9-4470-a728-4d0320b11e53',
    productId: '8249b550-4e57-47e7-86b3-ac5e9bbec1d9',
    spent: '933',
    result: 'PENDING'
  },
  {
    id: '3c275535-89e5-4072-9de2-0a27a3a4aa28',
    cifId: 'ad5ab4ac-c039-4198-a985-a3b9ea69dad5',
    gameId: '3cbed20f-1c02-4ab8-8291-8c8cab3439f0',
    productId: '387dab2a-3705-4202-abcc-0d4d0d9fcd75',
    spent: '402',
    result: 'PENDING'
  },
  {
    id: 'cef54e50-bc7e-42ce-992d-36d85f863e4c',
    cifId: 'c588b7ea-4254-4a08-96ae-14d40f36d557',
    gameId: '7198dc7f-278c-4213-957b-6614ea20e27f',
    productId: 'f95ecf4d-33de-4653-9ec4-b797a4a7a296',
    spent: '542',
    result: 'PENDING'
  },
  {
    id: '2e5f1e09-bd03-499e-b930-e13549658b0d',
    cifId: '89437413-7f35-4606-8df5-5ec9597361c5',
    gameId: 'd1b2fbf3-5cbc-44b6-a98b-02df2d8571e0',
    productId: 'a82811e3-6ac8-403b-a808-4d6f7ad882de',
    spent: '178',
    result: 'PENDING'
  },
  {
    id: '19dc699c-1ab7-49b1-a52a-27396ef319d0',
    cifId: 'b55bdd7f-1f80-4e5e-95d4-c5cd83829128',
    gameId: '6c36387f-e546-4e72-baa0-c9d419928102',
    productId: 'e1898593-f764-4d13-a113-1ef1280bf02b',
    spent: '150',
    result: 'PENDING'
  },
  {
    id: 'd3b2b5fa-3126-4a29-ae7e-07a7a1fcf7aa',
    cifId: '9ec276ca-18e0-4419-8c6a-a3d930e46e05',
    gameId: '352b53a3-4f82-4c5a-a826-b4ed57bf9215',
    productId: 'b6167826-6827-476c-8215-c39594cf1d82',
    spent: '635',
    result: 'PENDING'
  },
  {
    id: 'ba7b809f-4453-4a1a-8154-3b07d5698620',
    cifId: '89b1fbc5-f5bf-439a-aeb9-bb1c14695eb5',
    gameId: '765afd80-0e8c-4f3d-8cd4-2c6027744751',
    productId: '48687bb3-1bf7-437b-8b29-5a8e399ab91b',
    spent: '797',
    result: 'PENDING'
  },
  {
    id: 'b831e912-bfc0-4fd4-b322-dac977009090',
    cifId: 'f78dd926-cd62-4d02-8cc0-51ed74a87db1',
    gameId: 'ff8728b5-b1d2-45f4-87cf-bbc5b27f3f0e',
    productId: 'dc52228f-55b4-41a5-96c6-c2407638339f',
    spent: '452',
    result: 'PENDING'
  },
  {
    id: '0bfc2e2a-2ce0-4638-9062-792772b49a52',
    cifId: '15719265-f3f9-4bc7-bd0a-d342a0deeb76',
    gameId: '9a3db70e-8799-48c0-993f-6b17deb59001',
    productId: 'd5371917-cf5e-441b-95ac-fe00cf495711',
    spent: '219',
    result: 'PENDING'
  },
  {
    id: 'a663f354-0fc8-4a9e-be46-ba1461184a74',
    cifId: '5aad49bb-b3ec-42e9-8c19-b856be587329',
    gameId: '381b28b2-53bd-4661-a25d-5e2680028468',
    productId: '3a526506-d8f0-41b9-846f-77654a3c2a42',
    spent: '444',
    result: 'PENDING'
  },
  {
    id: 'dab9a6ee-dd51-440c-bd58-e9870e1e1d05',
    cifId: '073eadb4-eefd-409b-9ae4-0bdc471d6b47',
    gameId: '614224b9-2593-44e7-a979-30ad6def877a',
    productId: '2ab25a3b-3e62-471c-b545-9915020bfd02',
    spent: '87',
    result: 'PENDING'
  },
  {
    id: '871abd42-d18e-457d-9ef9-3b8772025eb0',
    cifId: 'da092155-0fd3-4988-bc80-2f56b0763279',
    gameId: 'dca612de-4047-45de-80c2-e98529dc1ac3',
    productId: '7134117c-73f9-48c0-84fd-0cfd9c809860',
    spent: '583',
    result: 'PENDING'
  },
  {
    id: '1b05163e-f8a2-4109-814b-e0224a3162a3',
    cifId: '691f97b3-ccb1-4573-bb9b-e0c313ef1070',
    gameId: 'bd28b23b-0ba7-43d3-a7cd-e11d482d96a6',
    productId: '7ad228e4-e8c9-4e89-8b0d-ec389c4b2c43',
    spent: '912',
    result: 'PENDING'
  },
  {
    id: 'aee5d0cc-0d64-49ea-b9c0-5e6e120f14cc',
    cifId: '33e9ce74-2a64-4333-9ed3-ab8f0c15ad15',
    gameId: 'fe28d481-951d-4ba0-a4b0-f4ad86b02e28',
    productId: '32f4ffe7-a770-4f16-bc61-161900ef4724',
    spent: '706',
    result: 'PENDING'
  },
  {
    id: '1eb768ec-f764-434b-b43c-3e4397c837dc',
    cifId: '3680d8eb-dd83-4d8f-890a-8253e2e09ffc',
    gameId: 'fb1b28c2-e858-4c8b-a7fa-6af276d84636',
    productId: 'e1898593-f764-4d13-a113-1ef1280bf02b',
    spent: '819',
    result: 'PENDING'
  },
  {
    id: 'f19ec234-130b-45d1-928d-75d072e7bdf8',
    cifId: 'b9a5b18c-0bc5-4340-8744-1f5204668546',
    gameId: '819d9ce0-0481-41ff-a44c-3e92df0eb292',
    productId: '9acb72b4-a13e-413d-addd-e312887efed3',
    spent: '244',
    result: 'PENDING'
  },
  {
    id: 'b836a812-9b78-44ee-87a4-f470ca465333',
    cifId: 'eba9d537-f213-460b-9055-b7765d5bbf1c',
    gameId: '64df98eb-7d77-40a2-94b1-885d50e442e4',
    productId: '77d30803-0d88-45e0-8184-47e9e57247df',
    spent: '876',
    result: 'PENDING'
  },
  {
    id: '6272bd80-7638-44cc-ba40-c518fcf98411',
    cifId: '2327a7dd-75aa-43dd-84b0-31ce8c77d53d',
    gameId: '89d4485a-fd78-4ac3-9acd-782758e47bab',
    productId: '712a93f6-d7cc-42e3-bb23-d25b9278acbc',
    spent: '170',
    result: 'PENDING'
  }
]

let groupedByGameTypeId = {}
const collectProductId = {}
for(const product of products) {
    if(!groupedByGameTypeId[product.gameTypeId]) {
        groupedByGameTypeId[product.gameTypeId] = {}
        collectProductId[product.gameTypeId] = {}
    }

    if(!groupedByGameTypeId[product.gameTypeId][product.category]) {
        collectProductId[product.gameTypeId][product.category] = []
        groupedByGameTypeId[product.gameTypeId][product.category] = {}
    }

    if(!groupedByGameTypeId[product.gameTypeId].totalUsers) {
        groupedByGameTypeId[product.gameTypeId].totalUsers = 0
    }

    if(!groupedByGameTypeId[product.gameTypeId][product.category][product.id]) {
        groupedByGameTypeId[product.gameTypeId][product.category][product.id] = {
            users: 0,
            totalSpents: new Big("0")
        }
    }

    collectProductId[product.gameTypeId][product.category].push(product.id)
}


for(const userGame of usersGame) {
  const product = products.find(prod => prod.id === userGame.productId)

  groupedByGameTypeId[product.gameTypeId].totalUsers++
  groupedByGameTypeId[product.gameTypeId][product.category][product.id].users++
  groupedByGameTypeId[product.gameTypeId][product.category][product.id].totalSpents = groupedByGameTypeId[product.gameTypeId][product.category][product.id].totalSpents.add(new Big(userGame.spent))
}

let filteredWinner = {}
let winnerProductId = []
for(const gameTypeId in groupedByGameTypeId) {
    if(!filteredWinner[gameTypeId]) {
        filteredWinner[gameTypeId] = {
            result: {
                totalWinner: 0,
                totalLooser: 0,
                totalUsers: 0
            }
        }
    }  
    let totalWinner = 0
    for(const category in groupedByGameTypeId[gameTypeId]) {
        if(category !== "totalUsers") {
            for(const productId in groupedByGameTypeId[gameTypeId][category]) {
                const {totalSpents, users} = groupedByGameTypeId[gameTypeId][category][productId]
                if(totalSpents.gt(new Big("0"))) {
                    if(!filteredWinner[gameTypeId][category]) {
                        filteredWinner[gameTypeId][category] = {
                            productId: productId,
                            totalSpents: totalSpents,
                            totalWinnerByCategory: users,
                        }

                        continue;
                    }
                    
                    if(totalSpents.lt(filteredWinner[gameTypeId][category].totalSpents)) {
                        filteredWinner[gameTypeId][category].totalSpents = totalSpents
                        filteredWinner[gameTypeId][category].productId = productId
                    }
                }
            }

            const getProducts = products.filter(product => {
                return product.category === category && product.gameTypeId === gameTypeId
            })
            const randomIndex = Math.floor(Math.random() * getProducts.length) + 1;
            if (!filteredWinner[gameTypeId][category]) {
                filteredWinner[gameTypeId][category] = {
                    productId: getProducts[randomIndex - 1].id,
                    totalSpents: new Big("0"),
                    totalWinnerByCategory: 0,
                }
            }

            totalWinner += filteredWinner[gameTypeId][category].totalWinnerByCategory
            winnerProductId.push(filteredWinner[gameTypeId][category].productId)
        }
    }

    filteredWinner[gameTypeId].result.totalWinner = totalWinner
    filteredWinner[gameTypeId].result.totalUsers = groupedByGameTypeId[gameTypeId]["totalUsers"]
    filteredWinner[gameTypeId].result.totalLooser = groupedByGameTypeId[gameTypeId]["totalUsers"] - totalWinner
}

// let temp = {}
// for(const gameTypeId in groupedByGameTypeId) {
//     for(const category in groupedByGameTypeId[gameTypeId]) {
//         const {totalUsers, number, color, shape} = groupedByGameTypeId[gameTypeId]
//         let totalUserCategory = 0
//         for(const productId in groupedByGameTypeId[gameTypeId][category]) {
//             const {totalSpents, users} = groupedByGameTypeId[gameTypeId][category][productId]
//             if(!filteredWinner[gameTypeId]) {
//                 filteredWinner[gameTypeId] = {}
//                 temp[gameTypeId] = {}
//             }
            
//             if(!filteredWinner[gameTypeId][category]) {
//                 filteredWinner[gameTypeId][category] = {
//                     productId,
//                     totalSpents: new Big("0"),
//                     totalUsersWinner: 0,
//                     users: 0
//                 }
//             }
            
//             if(filteredWinner[gameTypeId][category].totalSpents.gt(totalSpents)) {
//                 filteredWinner[gameTypeId][category] = {
//                     productId,
//                     totalSpents: new Big(totalSpents),
//                     totalUsersWinner: users,
//                     totalUserCategory,
//                     users: totalUsers
//                 }
//             } 
//         }
//         console.log("Category : "+ category)
//         console.log(JSON.parse(JSON.stringify(filteredWinner)))
//         console.log("")
//         console.log("")
//     }
// }


// for(const gameTypeId in filteredWinner) {
//     for (const category in filteredWinner[gameTypeId]) {
//         for(const key in filteredWinner[gameTypeId][category]) {
//             const {users, productId, totalSpents, totalUsersWinner} = filteredWinner[gameTypeId][category][key]
//             if(users === 0) {
//                 const getProducts = products.filter(product => {
//                     return product.category === category && product.gameTypeId === gameTypeId
//                 })

//                 filteredWinner[gameTypeId][category] = {
//                     productId: getProducts[getProducts.length - 1].id,
//                     totalSpents: new Big("0"),
//                     totalUsersWinner: 0,
//                     users: 0
//                 }
//             }
//         }
//     }
// }

// console.log("after")
console.log(JSON.parse(JSON.stringify(filteredWinner)))
console.log(winnerProductId)
// console.log(JSON.parse(JSON.stringify(temp)))
// console.log(JSON.stringify(groupedByGameTypeId))
// console.log(JSON.parse(JSON.stringify(groupedByCategory)))