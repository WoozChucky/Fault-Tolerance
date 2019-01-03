import { Guid } from '../Guid';

test('Should create a guid', () => {

    const wrong = "wrongguid";

    expect(Guid.IsGuid(wrong)).toBe(false);

    const right = Guid.create();

    expect(Guid.IsGuid(right)).toBe(true);
});

test('Should raw a guid', () => {

    const wrong = "wrongguid";

    expect(Guid.IsGuid(wrong)).toBe(false);

    const right = Guid.raw();

    expect(Guid.IsGuid(right)).toBe(true);
});

test('Should compare another guid', () => {

    const wrong = Guid.create();

    expect(wrong.equals(Guid.create())).toBe(false);

    const right = Guid.create();

    expect(right.equals(right)).toBe(true);
});

test('Should compare another guid empty', () => {

    const wrong = Guid.createEmpty();

    expect(wrong.equals(Guid.create())).toBe(false);

    const right = Guid.createEmpty();

    expect(right.equals(Guid.createEmpty())).toBe(true);
});

test('Should verify if is guid', () => {

    const wrong = "wrong guid";

    expect(Guid.IsGuid(wrong)).toBe(false);

    const right = Guid.create();

    expect(Guid.IsGuid(right)).toBe(true);
});

test("Should parse a guid", () => {

    const wrong = Guid.raw();

    expect(Guid.parse(wrong).equals(Guid.create())).toBe(false);

    const right = Guid.raw();

    expect(Guid.parse(right).equals(Guid.parse(right))).toBe(true);
});

test("Should be unique guid value", () => {

    const guids = [];
    for (let index = 0; index < 3000; index++) {
        guids.push(Guid.create());
    }

    expect(guids.indexOf(guids[0]) < 0).toBe(false);

    expect(guids.indexOf(Guid.create()) < 0).toBe(true);
});